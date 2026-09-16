---
name: cfa-app-creation
description: Create new SwiftUI iOS projects using Cooperative Feature Architecture. Use when a new app using CFA or the CFA Toolkit is requested; not for restructuring existing apps or migrating GCD.
---

# CFA App Creation

Create the smallest complete working feature in a new Xcode project.

Read [CFA specification](references/cfa-specification.md) and [reference feature](references/reference-feature.md) before designing the project. Respect the user’s app requirements, deployment target and bundle identifier. Check the available Xcode version and installed destinations.

1. Define the first observable user journey and its success/error states. Choose the minimum persistence and external dependencies it needs.
2. Apply the specification’s folder map and ownership rules. Place StoreKit test configuration (`.storekit`) files under `3 - App Resources` on disk and in the Xcode navigator; update scheme references to match and keep these development-only files out of Copy Bundle Resources. Use AppModel.shared as the production composition root; keep screen state in dedicated ViewModels and business state in its feature owner.
3. Create one app-owned `ThemeManager` in its own file, at least two complete colour themes, and a Settings selector that persists the current selection. Supply the same manager to every screen and presentation; use its current palette consistently, including system appearance and input/list surfaces. Follow the specification’s Colour Theme section.
4. Connect View → ViewModel → feature API → implementation. Do not stop at empty tabs, placeholder managers or a project that only compiles.
5. Keep commands awaitable. Give cancellable tasks an explicit owner, and preserve isolation across feature and repository boundaries without introducing unnecessary actors or protocols.
6. Build the iPhone target and exercise the first journey. Test meaningful business rules and ViewModel behaviour. Record unavailable simulator/device checks accurately.

Deliver the Xcode project, a short explanation of feature ownership, and executed validation. Apply the specification’s review checklist to the created slice. Do not perform legacy migration as part of this skill.
