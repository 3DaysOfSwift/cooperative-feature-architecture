# Install CFA

## Requirements

- Node.js 20 or newer (`node --version`). No npm package installation is needed.
- For the plugin: a Codex CLI supporting `codex plugin add` and personal marketplaces.
- For iPhone builds: a Mac, Xcode and an available Simulator/device.
- For AI-guided workflows: your own supported agent/account and its normal permissions.

Node.js, Xcode and the AI host are not bundled. The package contains the architecture,
all five skills, references and dashboard executable source, with no Trend dependency.

## Recommended: Codex plugin

1. Download the `cooperative-feature-architecture-<version>-plugin.zip` release.
2. Extract it. Keep the extracted folder intact.
3. Open a terminal in that folder and run:

```sh
node scripts/install.mjs
```

On macOS you can instead open `Install.command`; Terminal will run the same installer.
If macOS asks you to approve opening a downloaded script, inspect the script and use
the terminal command above. The package is not an Apple-signed or notarised installer.

The installer verifies the package checksum inventory, copies the complete plugin to
`~/plugins/cooperative-feature-architecture`, preserves/extends your personal
`~/.agents/plugins/marketplace.json`, and runs `codex plugin add` using the actual
marketplace name. No custom marketplace registration is required for this default
personal location. No source app is changed and no software is downloaded.

If `codex` is not on PATH, pass its executable explicitly:

```sh
node scripts/install.mjs --codex /path/to/codex
```

Open a **new conversation** after installation. Try `$cfa-app-creation` or
`$cfa-architecture-review`; some hosts display plugin-qualified names in their skill picker.

If native Codex activation fails, the installer exits unsuccessfully and explains
how to retry. The source and marketplace entry stay staged; it does not claim that
Codex has loaded them. The plugin validator checks package structure but cannot prove
compatibility with every host version.

## Standalone skills

```sh
node scripts/install.mjs --mode skills
```

This installs all five folders under `~/.agents/skills`. Each is self-contained: the
CFA specification is bundled in creation, adoption and review skills; the dashboard source and docs
are inside the review skill. Check the target agent’s documented discovery path.
For a different location, `--destination /path/to/profile-root` places the skills
beneath that root’s `.agents/skills`. This is a filesystem installation, not a promise
that every agent supports the same capabilities.

## Upgrades

Run the installer from the new extracted release with `--replace` (and the same mode).
Only CFA-managed, unmodified installations can be replaced. The previous directories
are retained as `.backup-<identifier>` beside the installation. Edited or unrelated
folders are not overwritten; move them aside deliberately before retrying.

The installer preserves the existing marketplace name, metadata, other plugins and
an existing CFA policy entry. It refuses a CFA entry pointing to a different source.

### Upgrading from the original two-skill release

Plugin mode replaces the whole managed package with `--replace`, so the old skill
names disappear from the active package. Open a new conversation afterward.

For standalone mode, the installer refuses to proceed if `cfa-development` or
`xcode-project-dashboard` remains under `.agents/skills`. Move these legacy folders
outside the host’s skill discovery directory first, retaining any edits, then install
the five new skills. This prevents duplicate or conflicting guidance. The installer
never silently deletes an old skill or guesses whether local edits are disposable.

## Uninstall

For a plugin, use `codex plugin remove cooperative-feature-architecture@personal`,
substituting the marketplace name printed by the installer if it was not `personal`.
This removes native activation; the staged source and marketplace listing can remain
for reinstall. Remove those deliberately only when you no longer need them.

For standalone skills, remove only the five installed folders printed by the installer:
`cfa-app-creation`, `cfa-architecture-adoption`, `swift-concurrency-migration`,
`cfa-architecture-review`, and `cfa-codebase-tidy`. Keep any local edits first.

## Offline staging and checksums

```sh
node scripts/install.mjs --destination /path/to/temporary-profile --stage-only
```

This prepares a plugin and personal marketplace without calling Codex. It is useful
for testing and is labelled **staged**, not installed.

`SHA256SUMS` lets users compare downloaded archive digests. `checksums.json` protects
the extracted package against accidental modification. These are integrity checks,
not publisher signatures; obtain the release from the intended repository.
