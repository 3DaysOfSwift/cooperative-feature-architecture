import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root } from './sync.mjs';
import { validate } from './validate.mjs';
import { inventory, writeJSON } from './files.mjs';
export function stageRelease(output,base=root) {
  validate(base);
  output=path.resolve(output);
  if(fs.existsSync(output)) throw Error('Release output must be a new directory.');
  const copy=(relative) => {
    const destination=path.join(output,relative);
    fs.mkdirSync(path.dirname(destination),{recursive:true});
    fs.cpSync(path.join(base,relative),destination,{recursive:true,errorOnExist:true,force:false});
  };
  for(const relative of ['.codex-plugin','readme-images','skills','LICENSE','Install.command','docs','architecture','examples','scripts/install.mjs','scripts/files.mjs'])copy(relative);
  fs.copyFileSync(path.join(base,'docs/PLUGIN_README.md'),path.join(output,'README.md'));
  writeJSON(path.join(output,'checksums.json'),inventory(output));
  validate(output,{source:false});
  return output;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    if(process.argv.length!==3)throw Error('Usage: node scripts/build.mjs <new-output-folder>');
    console.log(stageRelease(process.argv[2]));
  }catch(error){console.error(error.message);process.exitCode=1;}
}
