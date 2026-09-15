[![3 Days of Swift Concurrency — iOS developer training](readme-images/3DaysOfSwift-Concurrency-Header.png)](https://www.3daysofswiftconcurrency.com/)

# Cooperative Feature Architecture (CFA)

**An AI-assisted iOS architecture toolkit for SwiftUI and Swift Concurrency.**

**Created and published by [3DaysOfSwiftConcurrency.com](https://www.3daysofswiftconcurrency.com/) — a free, open-source gift to the iOS development community.**

Cooperative Feature Architecture is a modern approach to iOS development with AI.
It structures an Xcode project around features with explicit ownership of state,
behaviour and dependencies. These boundaries help developers and AI coding agents
identify where a change belongs and extend features without spreading responsibilities
across unrelated components.

The CFA Toolkit provides architecture rules, development and migration skills, and
a source review tool. It gives AI concrete constraints to follow, reducing guesswork
and helping developers avoid a tangled network of app components as an app grows.

## The publisher and its training

<a href="https://www.3daysofswiftconcurrency.com/">
  <img src="readme-images/3DaysOfSwiftConcurrency-Logo.png" alt="3 Days of Swift Concurrency — visit our training website" width="280">
</a>

**[Explore the training at 3DaysOfSwiftConcurrency.com →](https://www.3daysofswiftconcurrency.com/)**

[3DaysOfSwiftConcurrency.com](https://www.3daysofswiftconcurrency.com/) offers iOS
developer training in Swift Concurrency. CFA shares its approach to maintainable
application structure with the wider industry. The toolkit is free to use, including
in commercial projects; no course purchase is required. Visit the website for the
training programme and course details.

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

## Copyright and permission

Copyright © 2026 3 Days of Swift Concurrency — https://www.3daysofswiftconcurrency.com/.
Copyright is retained. The [MIT licence](LICENSE) grants permission to use, modify
and redistribute the toolkit, including commercially, provided its copyright and
permission notices are retained in copies or substantial portions. Open source
does not mean public domain.
