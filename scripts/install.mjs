#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { inventory, verify, json, writeJSON, files } from './files.mjs';

const NAME='cooperative-feature-architecture';
const RECEIPT='.cfa-receipt.json';
function runCodex(executable,args) {
  const result=spawnSync(executable,args,{stdio:'inherit',shell:false});
  if(result.error || result.status!==0) throw Error(`Codex did not complete installation. Source files are staged safely. Retry: ${executable} ${args.join(' ')}`);
}
function safeDirectories(root,relative) {
  fs.mkdirSync(root,{recursive:true});
  let current=root;
  for(const part of relative.split(path.sep).filter(Boolean)) {
    current=path.join(current,part);
    if(fs.existsSync(current) && (fs.lstatSync(current).isSymbolicLink() || !fs.statSync(current).isDirectory())) throw Error(`Expected an ordinary directory: ${current}`);
  }
}
function checkManaged(target,replace) {
  if(!fs.existsSync(target)) return;
  if(!replace) throw Error(`Already exists: ${target}. Use --replace for an unmodified CFA-managed installation.`);
  const receiptPath=path.join(target,RECEIPT);
  if(!fs.existsSync(receiptPath)) throw Error(`Not a CFA-managed installation: ${target}. Move it aside yourself before installing.`);
  const receipt=json(receiptPath);
  if(receipt.product!==NAME) throw Error(`Unrecognised installation: ${target}`);
  verify(target,receipt.files,[RECEIPT]);
}
function atomicJSON(file,value) {
  const tmp=file+`.${crypto.randomUUID()}.tmp`;
  try {writeJSON(tmp,value);fs.renameSync(tmp,file);} finally {if(fs.existsSync(tmp))fs.unlinkSync(tmp);}
}
export function install({source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),destination=os.homedir(),mode='plugin',replace=false,stageOnly=false,codex='codex',execute=runCodex}={}) {
  if(Number(process.versions.node.split('.')[0])<20) throw Error('Node.js 20 or newer is required.');
  if(!['plugin','skills'].includes(mode)) throw Error('Mode must be plugin or skills.');
  if(stageOnly && mode!=='plugin') throw Error('--stage-only applies only to plugins.');
  source=path.resolve(source);destination=path.resolve(destination);
  if(mode==='plugin'&&!stageOnly && destination!==path.resolve(os.homedir())) throw Error('Use --stage-only when supplying a custom destination for plugins.');
  const checksums=path.join(source,'checksums.json');
  if(!fs.existsSync(checksums)) throw Error('Use the extracted release package. Maintainers: build it with python3 scripts/release.py first.');
  verify(source,json(checksums),['checksums.json']);
  const manifest=json(path.join(source,'.codex-plugin/plugin.json'));
  if(manifest.name!==NAME) throw Error('Unexpected plugin name.');
  const destinations=mode==='plugin' ? [[source,path.join(destination,'plugins',NAME)]] : ['cfa-development','xcode-project-dashboard'].map(name=>[path.join(source,'skills',name),path.join(destination,'.agents/skills',name)]);
  let market,marketFile;
  if(mode==='plugin') {
    safeDirectories(destination,'.agents/plugins');
    marketFile=path.join(destination,'.agents/plugins/marketplace.json');
    if(fs.existsSync(marketFile) && fs.lstatSync(marketFile).isSymbolicLink()) throw Error('Refusing a linked marketplace file.');
    market=fs.existsSync(marketFile) ? json(marketFile) : {name:'personal',interface:{displayName:'Personal'},plugins:[]};
    if(!/^[A-Za-z0-9_-]+$/.test(market.name) || !Array.isArray(market.plugins)) throw Error('Existing personal marketplace is invalid; no changes made.');
    const previous=market.plugins.find(p=>p.name===NAME);
    if(previous && (previous.source?.source!=='local' || previous.source?.path!==`./plugins/${NAME}`)) throw Error('CFA marketplace entry points to another source; no changes made.');
  }
  for(const [from,to] of destinations) {
    safeDirectories(destination,path.relative(destination,to));
    if(to===source || source.startsWith(to+path.sep) || to.startsWith(source+path.sep)) throw Error('Source and installation destination must be separate.');
    files(from);checkManaged(to,replace);
  }
  const changes=[];
  try {
    for(const [from,to] of destinations) {
      fs.mkdirSync(path.dirname(to),{recursive:true});
      const stage=path.join(path.dirname(to),`.cfa-stage-${crypto.randomUUID()}`);
      fs.cpSync(from,stage,{recursive:true,errorOnExist:true,force:false});
      writeJSON(path.join(stage,RECEIPT),{product:NAME,version:manifest.version,files:inventory(stage)});
      let backup;
      if(fs.existsSync(to)) { backup=`${to}.backup-${crypto.randomUUID()}`;fs.renameSync(to,backup); }
      changes.push({to,backup,stage});
      fs.renameSync(stage,to);
    }
    if(market) {
      const entry={name:NAME,source:{source:'local',path:`./plugins/${NAME}`},policy:{installation:'AVAILABLE',authentication:'ON_INSTALL'},category:'Productivity'};
      const index=market.plugins.findIndex(p=>p.name===NAME);
      // Retain existing policy/metadata; only the packaged source changes on an upgrade.
      if(index<0) market.plugins.push(entry);
      atomicJSON(marketFile,market);
    }
  } catch(error) {
    for(const change of changes.reverse()) {
      if(fs.existsSync(change.to))fs.rmSync(change.to,{recursive:true});
      if(change.backup)fs.renameSync(change.backup,change.to);
      if(fs.existsSync(change.stage))fs.rmSync(change.stage,{recursive:true});
    }
    throw error;
  }
  if(mode==='plugin'&&!stageOnly) {
    if(destination!==path.resolve(os.homedir())) throw Error('Custom destination was staged only; native Codex activation is supported only for the actual user home.');
    execute(codex,['plugin','add',`${NAME}@${market.name}`]);
  }
  return {status:mode==='plugin'&&stageOnly?'staged':'installed',mode,version:manifest.version,paths:destinations.map(([,to])=>to),marketplace:market?.name,backups:changes.flatMap(c=>c.backup?[c.backup]:[])};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const options={};const args=process.argv.slice(2);
    if(args.includes('--help')) {
      console.log('CFA installer (Node.js 20+)\nnode scripts/install.mjs [--mode plugin|skills] [--replace] [--codex executable]\nTesting/offline staging: --destination directory --stage-only\nDefaults to the current user’s personal plugin marketplace. No administrator rights or downloads.\nExisting installations are never replaced unless --replace is given; edited files are always protected.');
    } else {
      while(args.length) {
        const flag=args.shift();
        if(flag==='--replace') options.replace=true;
        else if(flag==='--stage-only')options.stageOnly=true;
        else if(['--mode','--destination','--codex'].includes(flag)&&args[0]&&!args[0].startsWith('--'))options[flag.slice(2)]=args.shift();
        else throw Error(`Unknown or incomplete option: ${flag}`);
      }
      const result=install(options);console.log(JSON.stringify(result,null,2));
      console.log(result.status==='installed'?'Installation complete. Open a new conversation to use the skills.':'Package staged; Codex activation was not attempted.');
    }
  } catch(error){console.error(error.message);process.exitCode=1;}
}
