[![3 Days of Swift Concurrency — iOS developer training](readme-images/README-Logo-h512.png)](https://www.3daysofswiftconcurrency.com/)

# Cooperative Feature Architecture (CFA)

**[View the CFA Toolkit on GitHub](https://github.com/3DaysOfSwift/cooperative-feature-architecture)**

**Created and published by [3DaysOfSwiftConcurrency.com](https://www.3daysofswiftconcurrency.com/) — a free, open-source gift to the iOS development community.**

- **Declarative SwiftUI Views.** Describe layout and presentation; keep imperative feature logic out of Views.
- **A bespoke ViewModel for each View.** Each View has a tightly coupled, observable ViewModel for its presentation needs.
- **One AppModel composition root.** Centralise dependency creation and inversion of control (IoC) in one assembly function.
- **Observable feature managers.** Each ViewModel retains the observable feature manager it needs.
- **Feature-owned state.** Each feature manager owns its feature’s data with explicit isolation boundaries.
- **Actors for concurrent feature work.** Worker actors move suitable work off the Main Actor; Swift’s shared executors schedule independent work across available CPU cores.
- **An architecture for AI-driven development.** Give developers and AI a shared structure for building modern, concurrent commercial iOS apps with an AI copilot, intended for the App Store.

## What is this AI Skill?

**The CFA Toolkit contains five AI skills:**

- CFA App Creation
- CFA Architecture Adoption
- Swift Concurrency Migration
- CFA Architecture Review
- CFA Codebase Tidy

**It also includes one tool:** Xcode Project Dashboard.

The toolkit gives iOS developers and their coding agents a shared architecture to follow when creating an Xcode project, improving an existing app or migrating legacy code.

### What is an AI skill?

An **AI skill** is a set of instructions and supporting resources that your coding agent loads for a specific job. CFA’s skills tell the agent where code belongs, which component owns each responsibility, how to preserve existing behaviour and what to verify before calling the work complete.

**Five skills · One tool · MIT licensed · 0.2.0 beta**

## Why this architecture?

- **Give AI a repeatable template.** The developer and coding agent work from the same folder structure, ownership rules and review criteria.
- **Make the code easier to read.** Find a feature’s behaviour and state through a named owner instead of tracing unrelated components throughout the project.
- **Make feature changes easier to maintain.** Clear boundaries show where a change belongs and which callers need to be checked.
- **Reduce architectural guesswork.** Concrete rules help prevent duplicated business logic, misplaced state and unnecessary layers in AI-generated code.
- **Keep components from becoming tangled.** Features expose deliberate interfaces rather than allowing arbitrary access to one another’s internals.
- **Put Swift Concurrency to work deliberately.** Identify who owns mutable state, asynchronous work, cancellation and results that arrive out of order.
- **Preserve behaviour during migration.** Record the app’s existing requirements and verify them as the implementation changes.
- **Review the result with evidence.** Inspect source-linked findings and distinguish architectural judgments from executed tests.

## How to install

1. **Choose the plugin download.** Get the `cooperative-feature-architecture-<version>-plugin.zip` archive. Use the plugin ZIP for installation; the source ZIP is for developing the toolkit. Find published downloads on the [GitHub Releases page](https://github.com/3DaysOfSwift/cooperative-feature-architecture/releases).

2. **Check the prerequisites.** Install Node.js 20 or newer and a Codex CLI that supports `codex plugin add`. Building and testing iPhone apps also requires a Mac and Xcode. These applications are not bundled with CFA.

3. **Extract the ZIP.** Keep the extracted `cooperative-feature-architecture` folder intact so the skills can find their references and dashboard tool.

4. **Run the installer.** Open Terminal in the extracted folder and run:

   ```sh
   node scripts/install.mjs
   ```

   On macOS, you can also open `Install.command` in that folder. The installer copies the plugin into your personal plugin location and asks Codex to activate all five skills. If activation fails, it reports the error and provides a retry command.

5. **Open a new Codex conversation with your Xcode project.** Choose the skill for your task and use one of the prompts below. For example:

   ```text
   Use $cfa-architecture-review to review this app without changing its source.
   ```

**Using another compatible coding agent?** Run `node scripts/install.mjs --mode skills` instead of the plugin installation command. This places five self-contained skill folders under `~/.agents/skills`; check your agent’s skill-discovery requirements.

See [installation and upgrades](docs/INSTALLATION.md) for existing installations, custom locations and troubleshooting. Users of the original two-skill release should read its upgrade section first.

## Skill 1 — CFA App Creation

**Build a new iOS app with CFA from the first working feature.**

This skill guides the agent through creating the Xcode project, applying the folder structure and connecting a screen to its ViewModel, feature behaviour and dependencies. It aims for a working user journey with relevant build and test evidence, rather than a collection of empty components.

### Suggested prompts

**Create a new app**

```text
Use $cfa-app-creation to create a SwiftUI iPhone app using CFA.
My app is called Notes. Build the first working note-creation feature.
```

**Build a complete first feature**

```text
Use $cfa-app-creation to start a personal journal app. Implement writing,
saving and displaying an entry, with a bespoke observable ViewModel,
a feature manager and dependencies assembled by AppModel.
```

**Start with testable business behaviour**

```text
Use $cfa-app-creation to build an expense-tracking app. Start with adding
an expense and calculating the monthly total. Test the business rules
and verify that the iPhone project builds.
```

[Read the App Creation skill](skills/cfa-app-creation/SKILL.md)

## Skill 2 — CFA Architecture Adoption

**Bring an existing application into CFA while preserving what the app does.**

This skill maps the current responsibilities, establishes a behaviour baseline and restructures one feature at a time. It separates screen state from business rules and gives each feature’s state and behaviour an explicit owner. It also supports bringing existing CFA features back into alignment.

### Suggested prompts

**Adopt CFA in an existing app**

```text
Use $cfa-architecture-adoption to adopt CFA in this existing app.
Preserve its behaviour and begin with one complete feature.
```

**Untangle a feature**

```text
Use $cfa-architecture-adoption to restructure the checkout feature.
Move business rules out of Views and ViewModels into its feature manager.
Give its state a clear owner and preserve checkout behaviour.
```

**Add a feature to an existing CFA app**

```text
Use $cfa-architecture-adoption to add favourites to this CFA app.
Follow its existing ownership rules, give each new screen a bespoke
ViewModel and assemble the required dependencies through AppModel.
```

[Read the Architecture Adoption skill](skills/cfa-architecture-adoption/SKILL.md)

## Skill 3 — Swift Concurrency Migration

**Migrate GCD, operation queues and callbacks to Swift Concurrency.**

This skill identifies the guarantees supplied by existing concurrency code—such as ordering, protected state, cancellation and error delivery—and guides the agent to preserve them during migration. It checks execution ownership and suspension boundaries rather than mechanically replacing queue calls with tasks.

You can use it with an existing architecture. **Concurrency migration does not automatically adopt CFA or replace the UI framework.**

### Suggested prompts

**Migrate a legacy GCD codebase**

```text
Use $swift-concurrency-migration to migrate this app’s GCD code to
Swift Concurrency. Preserve its existing architecture and behaviour.
Identify the ordering and state-protection guarantees before replacing
queues, groups and callbacks.
```

**Modernise both architecture and concurrency**

```text
Use $cfa-architecture-adoption and $swift-concurrency-migration to
modernise this legacy GCD app using CFA and Swift Concurrency.
Establish its existing behaviour, then migrate one complete feature
at a time with separate architecture and concurrency checkpoints.
```

This combined request uses two skills: Architecture Adoption changes the
application structure; Swift Concurrency Migration changes how concurrent
work is executed and owned.

**Replace a callback-based operation**

```text
Use $swift-concurrency-migration to convert this callback-based image
loader to async/await. Preserve cancellation, error delivery and caching.
Ensure an older request cannot overwrite the result of a newer request.
```

**Preserve ordering while removing GCD**

```text
Use $swift-concurrency-migration to replace this serial save queue.
Preserve the required save order across suspension points and verify
that overlapping edits cannot leave an older value on disk.
```

[Read the Swift Concurrency Migration skill](skills/swift-concurrency-migration/SKILL.md)

## Skill 4 — CFA Architecture Review

**Understand whether the implementation follows the intended architecture and where it needs attention.**

This skill inspects feature ownership, live dependency wiring and concurrency boundaries without refactoring the app. It reports source-linked findings, their consequences and recommended changes. It can review legacy GCD apps manually and use the dashboard tool for supported Swift Concurrency projects.

### Suggested prompts

**Review the application**

```text
Use $cfa-architecture-review to review this app’s feature ownership
and concurrency boundaries. Report findings without changing app code.
```

**Review AI-generated changes**

```text
Use $cfa-architecture-review to review these AI-generated changes
against CFA. Identify misplaced business logic, duplicated state,
unnecessary dependencies and unclear task ownership. Cite the code
behind each finding and recommend focused corrections.
```

**Generate an architecture dashboard**

```text
Use $cfa-architecture-review to produce an Xcode Project Dashboard
for this Swift Concurrency app. Show source-linked findings, task
journeys and test evidence. Distinguish reviewed judgments from
executed test results.
```

**Check a migrated feature**

```text
Use $cfa-architecture-review to inspect the migrated search feature.
Trace cancellation, repeated requests and result publication. Identify
where stale results could reach the UI, without changing the source.
```

[Read the Architecture Review skill](skills/cfa-architecture-review/SKILL.md)

## The tool — Xcode Project Dashboard

The toolkit’s executable tool scans Swift source and generates a local HTML dashboard and structured report. The review skill uses that inventory to explain task creation, operation journeys, separation of responsibilities and test evidence.

The scanner finds source patterns. The reviewing developer or agent supplies the reasoning behind findings and ratings; the tool does not compile Swift or prove that an application is race-free.

You can also run the bundled scanner directly with Node.js:

```sh
node skills/cfa-architecture-review/scripts/dashboard/src/cli.mjs /path/to/app --out /path/to/new-report
```

## The architecture behind the skills

```text
View → dedicated ViewModel → Feature API → Feature Manager → Repository
```

`AppModel.shared` is the production composition root: it brings the app’s feature dependencies together. Each feature owns its business state and behaviour; screen-specific presentation state stays in its ViewModel.

The [CFA specification](architecture/cfa-specification.md) defines the folder map, ownership rules and review checklist. It is maintained centrally and bundled into the skills that need it. Swift Concurrency does not require CFA or one actor per feature; CFA supplies a consistent way to organise responsibilities when using it.

## The publisher and its training

[![3 Days of Swift Concurrency — explore the training](readme-images/README-Logo-h512.png)](https://www.3daysofswiftconcurrency.com/)

**[Explore the training at 3DaysOfSwiftConcurrency.com →](https://www.3daysofswiftconcurrency.com/)**

3 Days of Swift Concurrency offers Swift Concurrency training for iOS developers. CFA shares its approach to maintainable application structure as a free, open-source gift to the industry. You can use the toolkit in personal and commercial projects; no course purchase is required.

## Status and evidence

CFA is a beta toolkit. Its packaging tests and skill validators pass; end-to-end app creation and migration trials and native Codex activation remain validation gaps. See the [validation record](docs/VALIDATION.md). Architectural rules support better work, but generated code still needs review, builds and tests appropriate to the application.

The dashboard scanner runs locally without network dependencies. Your AI host has its own data-handling policy, and reports contain source excerpts. See [Privacy](docs/PRIVACY.md).

## Copyright and permission

Copyright © 2026 **3 Days of Swift Concurrency** — [3DaysOfSwiftConcurrency.com](https://www.3daysofswiftconcurrency.com/).

Copyright is retained. The [MIT licence](LICENSE) permits use, modification and redistribution, including commercially, provided the copyright and permission notices are retained in copies or substantial portions.

## Maintain an existing CFA codebase

Use **CFA Codebase Tidy** for iterative maintenance: simplify the View layer, keep SwiftUI declarative, move reusable behaviour into features, review actor ownership, and fill unit-test gaps. Every ViewModel gets a dedicated suite; each feature manager is audited by function and observable behaviour.

```text
Use $cfa-codebase-tidy to refine this CFA project and add missing unit tests.
Preserve existing behaviour and report verification results and remaining gaps.
```

The workflow changes code when requested. Architecture Review remains read-only.
