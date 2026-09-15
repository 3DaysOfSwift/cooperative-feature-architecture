# Cooperative Feature Architecture (CFA)

**An AI-assisted iOS architecture toolkit for SwiftUI and Swift Concurrency.**

This complete plugin package includes **CFA Development**, **Xcode Project Dashboard**,
the architecture specification and the dashboard executable. No Trend checkout is needed.

## Install

With Node.js 20+ and a compatible Codex CLI installed, run from this folder:

```sh
node scripts/install.mjs
```

On macOS, `Install.command` runs the same installer. Use a new conversation afterward.
For a compatible standalone skill host, use `node scripts/install.mjs --mode skills`.
Read [installation and upgrades](docs/INSTALLATION.md) for paths, prerequisites and recovery.

## Use

- `Use $cfa-development to build a SwiftUI iOS app using CFA. My bundle prefix is com.example.`
- `Use $cfa-development to migrate this legacy app while preserving its product behaviour.`
- `Use $xcode-project-dashboard to review this app without modifying its source.`

The bundled scanner can also run directly:

```sh
node skills/xcode-project-dashboard/scripts/dashboard/src/cli.mjs /path/to/app --out /path/to/new-report
```

See the [CFA specification](architecture/cfa-specification.md),
[development skill](skills/cfa-development/SKILL.md),
[dashboard skill](skills/xcode-project-dashboard/SKILL.md), and
[privacy explanation](docs/PRIVACY.md).

## Status

0.1.0 beta. The dashboard inventories source patterns; a review supplies semantic
judgments. Neither a score nor a successful build certifies production readiness.
Node.js, Xcode and an AI host are separate prerequisites. No developer-server telemetry
or network dependency is built into the scanner, but your AI host has its own data policy.

MIT licensed. Created by 3 Days of Swift Concurrency. Source and contributor materials
are provided in the separate source ZIP. The checksum inventory detects accidental
changes; it is not a publisher signature.
