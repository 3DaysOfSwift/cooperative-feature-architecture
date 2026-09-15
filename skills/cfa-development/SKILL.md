---
name: cfa-development
description: Build or maintain SwiftUI iOS apps using Cooperative Feature Architecture (CFA), or migrate a legacy app to CFA and Swift Concurrency when requested. Use for CFA/AppModel architecture requests and existing CFA projects. Preserve an established architecture unless adoption is requested.
metadata:
  short-description: Build maintainable AppModel SwiftUI apps
---

# CFA Development

Apply the bundled CFA specification rather than reconstructing it
from this entry point.

## When to Apply this Skill

Use this skill when:

- an iOS developer explicitly asks for AppModel architecture;
- an iOS developer requests a new SwiftUI project using CFA or this toolkit; or
- an existing application already follows this template and needs to be built,
  changed, reviewed, or brought back into alignment; or
- an iOS developer explicitly requests that an existing application be migrated
  to AppModel or from GCD to Swift Concurrency.

Do not impose the template on an existing application with a different
architecture unless the developer asks to adopt it.

For a legacy application migration, also read
[Legacy Application Migration](references/legacy-application-migration.md)
completely before planning or changing code.

Before designing, changing, or reviewing application architecture, read these
files completely:

1. [CFA Specification](references/cfa-specification.md)
2. [Reference Feature](references/reference-feature.md)

Both references ship inside this skill. The specification defines the rules;
the example illustrates them. No Trend checkout is needed. User product
requirements and explicit architecture choices take precedence over defaults.

## Apply the Template

- Preserve the product behaviour requested by the user; architecture must not
  change the required behaviour merely to make code look simpler.
- Begin by mapping each screen, ViewModel, feature capability, Feature Manager,
  repository contract, and external implementation to its advertised folder.
- Keep SwiftUI declarative and free of business decisions. Move reusable rules
  into the Feature Manager that owns them.
- Give every unique screen its own adjacent ViewModel, conventionally stored as
  `@State private var viewModel = FeatureViewModel()`.
- Let screen Views construct their own ViewModels. ViewModels obtain live feature
  capabilities through default initializer values and retain replaceable inputs
  for tests.
- Use `AppModel.shared` as the single production composition root and facade for
  shared feature managers. Do not place navigation or screen state in AppModel.
- Keep feature commands directly awaitable and testable. A View may create an
  unretained Task to bridge a synchronous UI event, but it must never store a
  Task handle. Move tracked or cancellable Task ownership into that screen's
  ViewModel.
- Add no wrapper, manager, protocol, or layer unless it has an immediate,
  concrete responsibility that improves ownership or maintenance.
- Test ViewModels independently and test business rules at the Feature Manager
  boundary. Preserve required concurrency behaviour in tests.

Before finishing, use the canonical Review Checklist and verify the project
builds and its relevant tests pass.
