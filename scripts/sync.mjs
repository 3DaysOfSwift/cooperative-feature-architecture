import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { files } from './files.mjs';
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function sync(base = root) {
  const copy = (source,destination) => {
    const from=path.join(base,source), to=path.join(base,destination);
    fs.mkdirSync(path.dirname(to),{recursive:true});
    fs.copyFileSync(from,to);
  };
  copy('architecture/cfa-specification.md','skills/cfa-development/references/cfa-specification.md');
  const tool=path.join(base,'tools/architecture-dashboard');
  const bundled=path.join(base,'skills/xcode-project-dashboard/scripts/dashboard');
  if (fs.existsSync(bundled)) {
    if(fs.lstatSync(bundled).isSymbolicLink()) throw Error('Refusing to replace a linked dependency folder.');
    fs.rmSync(bundled,{recursive:true});
  }
  for(const dir of ['src','Documentation']) for(const file of files(path.join(tool,dir))) copy(`tools/architecture-dashboard/${dir}/${file}`,`skills/xcode-project-dashboard/scripts/dashboard/${dir}/${file}`);
  for(const file of ['README.md','package.json']) copy(`tools/architecture-dashboard/${file}`,`skills/xcode-project-dashboard/scripts/dashboard/${file}`);
  for(const skill of ['cfa-development','xcode-project-dashboard']) copy('LICENSE',`skills/${skill}/LICENSE`);
  copy('LICENSE','skills/xcode-project-dashboard/scripts/dashboard/LICENSE');
}
if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) { sync(); console.log('Bundled skill dependencies synchronised.'); }
