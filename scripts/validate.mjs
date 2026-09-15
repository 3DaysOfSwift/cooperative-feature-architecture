import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root } from './sync.mjs';
import { files, hash, json } from './files.mjs';
export function validate(base=root,{source=true}={}) {
  const manifest=json(path.join(base,'.codex-plugin/plugin.json'));
  if(manifest.name!=='cooperative-feature-architecture') throw Error('Unexpected plugin identifier.');
  if(!/^\d+\.\d+\.\d+(?:-[a-z0-9.-]+)?$/.test(manifest.version)) throw Error('Invalid release version.');
  if(manifest.license!=='MIT' || manifest.skills!=='./skills/') throw Error('Missing licence or skills path.');
  for(const file of ['LICENSE','README.md','docs/INSTALLATION.md','docs/PRIVACY.md']) if(!fs.existsSync(path.join(base,file))) throw Error(`Missing ${file}`);
  for(const name of ['cfa-app-creation', 'cfa-architecture-adoption', 'swift-concurrency-migration', 'cfa-architecture-review', 'cfa-codebase-tidy']) {
    const skill=path.join(base,'skills',name);
    const text=fs.readFileSync(path.join(skill,'SKILL.md'),'utf8');
    if(!text.startsWith('---\n') || !text.includes(`name: ${name}\n`) || !/^description: .+/m.test(text)) throw Error(`Invalid skill: ${name}`);
    if(text.includes('[TODO:')) throw Error(`Unfinished skill: ${name}`);
    // Check actual Markdown file links throughout skill resources; examples/URLs are not opened.
    for(const relative of files(skill).filter(f=>f.endsWith('.md'))) {
      const file=path.join(skill,relative), content=fs.readFileSync(file,'utf8');
      if(/\/Users\/|\/home\//.test(content)) throw Error(`Machine-specific reference: ${relative}`);
      for(const match of content.matchAll(/\]\(([^)]+)\)/g)) {
        let link=match[1].split('#')[0];
        if(!link || /^[a-z]+:/i.test(link) || link.includes(' ')) continue;
        const resolved=path.resolve(path.dirname(file),decodeURIComponent(link));
        if(!resolved.startsWith(skill+path.sep) || !fs.existsSync(resolved)) throw Error(`Missing or external skill reference: ${relative} → ${link}`);
      }
    }
  }
  if(source) {
    if(json(path.join(base,'package.json')).version!==manifest.version) throw Error('Version mismatch.');
    for(const name of ['cfa-app-creation','cfa-architecture-adoption','cfa-architecture-review','cfa-codebase-tidy']) if(hash(path.join(base,'architecture/cfa-specification.md'))!==hash(path.join(base,`skills/${name}/references/cfa-specification.md`))) throw Error('Stale architecture copy. Run npm run sync.');
    for(const dir of ['src','Documentation']) for(const file of files(path.join(base,'tools/architecture-dashboard',dir))) {
      if(hash(path.join(base,'tools/architecture-dashboard',dir,file))!==hash(path.join(base,'skills/cfa-architecture-review/scripts/dashboard',dir,file))) throw Error(`Stale bundled tool: ${file}`);
    }
  }
  return manifest;
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  try {validate();console.log('CFA source, references, manifests and dependency copies validated.');}
  catch(error){console.error(error.message);process.exitCode=1;}
}
