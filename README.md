<p align="left">
  <a href="https://github.com/3DaysOfSwift/cooperative-feature-architecture">
    <img src="readme-images/CFA-Toolkit-AppIcon.png" width="320" alt="CFA Toolkit icon">
  </a>
</p>

# Cooperative Feature Architecture (CFA)

**CFA is a free toolkit of AI skills for building, changing, testing, migrating
and reviewing SwiftUI applications that use Swift Concurrency.**

It gives your AI coding tool a clear structure for an iOS project, so the code
it writes is easier to find, understand and maintain.

<p align="left">
  <a href="https://github.com/3DaysOfSwift/cooperative-feature-architecture">
    <img src="readme-images/3DaysOfSwiftConcurrency-h512.png" width="320" alt="3DaysOfSwiftConcurrency.com logo">
  </a>
</p>
Created by [3DaysOfSwiftConcurrency.com](https://www.3daysofswiftconcurrency.com/)
and released under the [MIT licence](LICENSE).

## Install CFA once

An AI skill is a small folder of instructions for an AI coding tool. Installing
CFA copies its seven skill folders into the place where your coding tool looks
for skills on your computer. When you later ask your AI to create an iOS app,
it can read the CFA instructions and use the CFA structure.

The installation does not change Xcode or your existing apps. It only makes the
CFA instructions available to your AI coding tool.

### Codex

Download and extract the CFA plugin release. In Terminal, change into the
extracted folder and run:

```sh
node scripts/install.mjs
```

This installs CFA into your personal Codex marketplace. Open a **new** Codex
conversation and paste this message:

```text
I have installed the CFA Toolkit for iOS from
https://github.com/3DaysOfSwift/cooperative-feature-architecture.
Do you have access to create and maintain iOS projects with CFA?
```

Codex should confirm that it can see the CFA skills. From that point, ordinary
requests such as “Create a new iOS app…” can use CFA without you having to paste
the architecture rules into every prompt.

### Claude Code and other AI coding tools

The portable CFA skills are in the repository’s `skills` folder. Copy all seven
folders inside it, without renaming them, into the folder where your AI coding
tool reads skills.

For Claude Code, that folder is commonly `~/.claude/skills`. This command copies
the skills there for you:

```sh
node scripts/install.mjs --mode skills --skills-directory ~/.claude/skills
```

If your tool uses a different skills folder, replace `~/.claude/skills` with
that folder. Restart the AI tool or start a new conversation, then send it the
same confirmation message shown above.

You need Node.js 20 or newer to run the installer and the dashboard. If your
tool supports plain skill folders, you can copy the seven folders manually
instead of using Node.js.

For screenshots, upgrades and troubleshooting, read
[Installation](docs/INSTALLATION.md).

## Try these CFA prompts

1. `Using CFA, create a new iOS app that finds where I parked my car.`
2. `Using CFA, migrate this legacy GCD codebase to Swift Concurrency.`
3. `Using CFA, add a new feature to the tab bar but keep it locked under an IAP.`
4. `Using CFA, now that we added a new feature, tidy up the code.`
5. `Using CFA, remove the new feature and all IAP code too.`
6. `Using CFA, make sure each exposed feature is unit tested, for all features.`
7. `Using CFA, analyse our use of Swift Concurrency: do we have race conditions that could result in unexpected behaviour?`
8. `Using CFA, add colour themes to the application.`

Saying **“Using CFA”** makes your intention clear. Once your AI tool reliably
finds installed skills, a normal iOS request can use CFA too. If it does not,
say “Using CFA” or name the relevant skill from the list below.

## CFA Toolkit skills

CFA contains seven AI skills and one local analysis tool.

| Skill | Use it when you want to… |
| --- | --- |
| [CFA App Creation](skills/cfa-app-creation/SKILL.md) | create a new iOS app with CFA from the first screen onward. |
| [CFA Feature Work](skills/cfa-feature-work/SKILL.md) | add, change or remove a feature in a CFA app. |
| [CFA Architecture Adoption](skills/cfa-architecture-adoption/SKILL.md) | move an existing modern app into CFA one feature at a time. |
| [Legacy GCD migration](skills/swift-concurrency-migration/SKILL.md) | replace GCD, operation queues and callbacks with CFA and Swift Concurrency. |
| [CFA Architecture Review](skills/cfa-architecture-review/SKILL.md) | inspect architecture and concurrency without changing the app. |
| [CFA Codebase Tidy](skills/cfa-codebase-tidy/SKILL.md) | simplify a CFA project after feature work. |
| [CFA Unit Tests](skills/cfa-unit-tests/SKILL.md) | write and audit tests that protect real feature behaviour. |

The included **Xcode Project Dashboard** scans a Swift Concurrency project and
creates a local HTML report. It exposes task creation, task ownership, source
locations, architecture observations and imported test results.

## The CFA architecture

CFA gives every type of code a clear home:

- **View:** says what the screen looks like.
- **ViewModel:** holds the screen state and prepares it for the View.
- **Feature Manager:** owns the feature’s business rules and feature state.
- **Repository:** reads and writes data, such as a local file, database or web service.
- **AppModel:** creates the real feature managers and repositories in one place.

The path through one feature is:

```text
View → dedicated ViewModel → Feature API → Feature Manager → Repository
```

Here is a small example of the CFA Xcode folder structure. Every feature has
its own View, ViewModel and feature code, so a developer can follow one feature
without searching through unrelated files.

```text
Application
├── 1 - View
│   ├── App.swift
│   ├── Theme
│   │   ├── AppColourTheme.swift
│   │   └── ThemeManager.swift
│   └── Views
│       └── Parking
│           ├── ParkingView.swift
│           └── ParkingViewModel.swift
├── 2 - AppModel
│   ├── AppModel.swift
│   ├── Features
│   │   └── Parking
│   │       ├── ParkingAPI.swift
│   │       ├── ParkingManager.swift
│   │       └── ParkingSpot.swift
│   └── User Data Storage
│       ├── Protocols
│       │   └── ParkingRepository.swift
│       └── Local
│           └── FileParkingRepository.swift
├── 3 - App Resources
│   ├── Assets.xcassets
│   └── PrivacyInfo.xcprivacy
├── 4 - Swift Extensions
│   └── Date+ParkingDay.swift
└── ApplicationTests
    ├── ViewModelTests
    │   └── ParkingViewModelTests.swift
    └── FeatureTests
        └── ParkingManagerTests.swift
```

`AppModel.shared` is the app’s composition root. It builds the real objects the
app needs and passes them to each feature. A Feature Manager owns feature rules;
a ViewModel owns only screen presentation state; a View stays quick to create
and simply reflects its ViewModel.

Read the full [CFA specification](architecture/cfa-specification.md) and
[Swift coding guide](architecture/swift-coding-guide.md) for the complete rules.

## What CFA helps your AI do

- Create a commercially structured SwiftUI project instead of a pile of files.
- Keep business decisions out of SwiftUI Views.
- Give every screen its own ViewModel.
- Keep each feature’s state and rules with the Feature Manager that owns it.
- Use Swift Concurrency with clear ownership, cancellation and ordering.
- Preserve the product’s behaviour while migrating a legacy app.
- Write meaningful tests for feature behaviour, failures and repeated requests.
- Review source code and show the evidence in a local dashboard.

## Legacy GCD migration means more than changing syntax

This is not a search-and-replace from `DispatchQueue.async` to `Task { }`.
GCD often protects important behaviour: save order, shared state, cancellation,
error delivery and the rule that an old request must not overwrite a new result.

The Legacy GCD migration skill first records that existing behaviour. It then
creates clear CFA feature boundaries and moves concurrency one feature at a
time. Builds, tests and manual regression testing check that the migrated app
still does what the original app did.

## Xcode Project Dashboard

Run the dashboard against a Swift Concurrency project when you want a visual
report of the code that exists today:

```sh
node skills/cfa-architecture-review/scripts/dashboard/src/cli.mjs /path/to/app --out /path/to/new-report
```

The dashboard runs locally. It does not edit your application. It can show where
Tasks are created, whether a root Task is tracked, possible suspension points,
architecture observations and imported test results. It links findings back to
the source code so you can inspect the evidence.

It cannot prove that an app has no race conditions. An AI reviewer must inspect
the relevant source, and the app still needs builds, tests and manual checks.

## Apps made with CFA

These open-source iOS projects show CFA in use:

- [Cuentiva](https://github.com/3DaysOfSwift/Cuentiva)
- [Personal API iOS App](https://github.com/3DaysOfSwift/Personal-API-iOS-App-Swift-Concurrency-CFA)
- [Trend iOS App](https://github.com/3DaysOfSwift/Trend-iOS-App-Swift-Concurrency-CFA)
- [RocketLaunch iOS App](https://github.com/3DaysOfSwift/RocketLaunch-iOS-App-Swift-Concurrency)
- [Metro Mate iOS](https://github.com/3DaysOfSwift/metro-mate-ios), an open-source app migrated with CFA and Swift Concurrency.

See [Apps Made with CFA](docs/APPS-MADE-WITH-CFA.md) to learn what each project
demonstrates.

## Build CFA from source

If you are contributing to the toolkit itself, run these commands from a source
checkout:

```sh
npm run sync
npm run validate
npm test
python3 scripts/release.py
```

Building a release needs Python 3 and Node.js 20 or newer. There are no npm
packages to install.

Read [Contributing](CONTRIBUTING.md), the [release process](docs/PUBLISHING.md),
the [validation record](docs/VALIDATION.md) and [Privacy](docs/PRIVACY.md).

## Copyright and permission

<p align="left">
  <a href="https://github.com/3DaysOfSwift/cooperative-feature-architecture">
    <img src="readme-images/3DaysOfSwiftConcurrency-h512.png" width="320" alt="3DaysOfSwiftConcurrency.com logo">
  </a>
</p>
Copyright © 2026 [3 Days of Swift Concurrency](https://www.3daysofswiftconcurrency.com/).

You may use, copy, change and share CFA, including in commercial work, under the
[MIT licence](LICENSE).
