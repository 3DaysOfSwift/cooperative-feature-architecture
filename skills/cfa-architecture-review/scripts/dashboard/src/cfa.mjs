#!/usr/bin/env node
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const dashboardCLI = path.join(path.dirname(fileURLToPath(import.meta.url)), 'cli.mjs');
const args = process.argv.slice(2);

function usage() {
  console.log(`CFA command

Usage:
  cfa dashboard [project-folder] [dashboard options]

Examples:
  cfa dashboard
  cfa dashboard ~/Developer/MyApp
  cfa dashboard ~/Developer/MyApp --include-tests

When no project folder is supplied, CFA analyses the current folder. The report
is written to a new cfa-dashboard-<date-and-time> folder beside that project.
The command never changes the analysed project.`);
}

if (!args.length || args.includes('--help') || args.includes('-h')) {
  usage();
} else if (args.shift() !== 'dashboard') {
  console.error('Unknown CFA command. Run: cfa --help');
  process.exitCode = 1;
} else {
  let project = process.cwd();
  if (args[0] && !args[0].startsWith('--')) project = args.shift();
  const hasOutput = args.includes('--out');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const output = path.join(path.resolve(project), `cfa-dashboard-${stamp}`);
  const dashboardArgs = [project, ...(hasOutput ? [] : ['--out', output]), ...args];
  const result = spawnSync(process.execPath, [dashboardCLI, ...dashboardArgs], {
    stdio: 'inherit',
    shell: false
  });
  if (result.error) {
    console.error(result.error.message);
    process.exitCode = 1;
  } else {
    process.exitCode = result.status ?? 1;
  }
}
