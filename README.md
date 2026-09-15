# Cooperative Feature Architecture (CFA)

**An AI-assisted iOS architecture toolkit for SwiftUI and Swift Concurrency.**

Build new iOS applications, migrate legacy GCD code, and review architecture with
explicit feature ownership. CFA gives developers and coding agents a shared set
of rules for Views, ViewModels, feature managers, repositories and actor isolation.

**0.1.0 beta · MIT licensed · Two skills and a local dashboard tool.**

## What you get

| Component | Purpose |
| --- | --- |
| [CFA specification](architecture/cfa-specification.md) | The architecture, folder map, ownership rules and review checklist |
| [CFA Development](skills/cfa-development/SKILL.md) | Build and maintain CFA apps; deliberately migrate existing apps when requested |
| [Xcode Project Dashboard](skills/xcode-project-dashboard/SKILL.md) | Guide source-based architecture and concurrency reviews |
| [Dashboard tool](tools/architecture-dashboard/README.md) | Inventory Swift source and render evidence-backed reports locally |

CFA is a method, not a runtime framework. Generated apps do not need to link a CFA
library. AppModel remains the composition root in the Swift implementation;
Cooperative Feature Architecture is the name of the method and toolkit.

## Install

Download the **plugin ZIP** from this repository’s Releases, extract it, and follow
[Installation](docs/INSTALLATION.md). In the extracted package:

```sh
node scripts/install.mjs
```

This installs into your personal Codex plugin location and activates both skills.
It requires Node.js 20+ and a compatible Codex CLI exposing `codex plugin add`.
No administrator rights or package downloads are needed. The script shows errors
instead of claiming success if native activation is unavailable.

For another compatible agent, install the two self-contained skill folders:

```sh
node scripts/install.mjs --mode skills
```

This copies them into `~/.agents/skills`; consult your agent’s discovery rules.
The skills share a format, but host capabilities and permissions still differ.
Do not install both modes into the same host unless you intentionally want duplicate
skill entries. Xcode and a Mac are required to build/test iOS apps.

**From a source checkout:** run `node scripts/sync.mjs`, `node scripts/validate.mjs`,
then `python3 scripts/release.py`. Install the resulting package from `dist/`.
Release packaging requires Python 3; ordinary installation requires only Node.js.

## Try the skills

- `Use $cfa-development to create a SwiftUI iOS app using CFA. My app is called Notes and my bundle prefix is com.example.`
- `Use $cfa-development to migrate this legacy application to CFA. Preserve its existing product behaviour.`
- `Use $xcode-project-dashboard to review this Swift Concurrency app. Keep the analysis read-only and distinguish source judgments from executed tests.`

The development skill follows the user’s requested architecture. It does not
replace another established architecture merely because it is installed.

## The ownership flow

```text
View → dedicated ViewModel → Feature API → Feature Manager → Repository
                                  ↑
                         assembled by AppModel.live()
```

Each feature has a clear owner of authoritative state and behaviour. Supporting
workers and storage actors may have separate responsibilities. CFA does not mean
one enormous manager or one actor per feature. Swift Concurrency does not prescribe
this architecture, and actor isolation does not make a workflow atomic across await.

## Evidence and limits

The dashboard is a lexical inventory tool, not a Swift compiler or race detector.
It cannot determine target membership, inferred isolation or full call graphs.
Human/agent review supplies semantic classifications and test scenarios; ratings
are only as sound as that evidence. Builds, runtime tests and source review answer
different questions. A clean dashboard is not production certification.

The scanner itself runs offline. An AI host may send code to its model provider
according to its own settings; CFA does not make a cloud model local. Reports
contain source excerpts. See [Privacy](docs/PRIVACY.md).

## Develop and release

```sh
npm test
npm run sync
npm run validate
python3 scripts/release.py
```

There are no npm dependencies to install. See [Contributing](CONTRIBUTING.md),
[release process](docs/PUBLISHING.md), and [validation evidence](docs/VALIDATION.md).
The generated release contains checksums and bundled references. The source archive
contains the test suites and packaging scripts. Trend is not required.

Created by **3 Days of Swift Concurrency**. See [origin](docs/ORIGIN.md).
