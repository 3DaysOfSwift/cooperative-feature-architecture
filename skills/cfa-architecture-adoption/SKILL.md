---
name: cfa-architecture-adoption
description: Adopt CFA in an existing iOS app or bring existing CFA features into alignment. Use for feature ownership and AppModel restructuring; not for GCD migration alone or read-only reviews.
---

# CFA Architecture Adoption

Restructure an existing app around CFA while preserving its observable behaviour.

Read [CFA specification](references/cfa-specification.md), [reference feature](references/reference-feature.md) and [product behaviour contract](references/product-behaviour-contract.md).

1. Identify the live target, dependency wiring and baseline build/tests. Map current screens, business decisions, state owners and persistence. Record existing failures separately.
2. Define a bounded feature and its behaviour contract. Map each responsibility to its CFA destination before moving code. Preserve public interfaces with temporary adapters where needed.
3. Separate screen presentation from feature rules. Introduce or align AppModel.shared as the composition root; do not use it as a dumping ground for migrated state. Move each authoritative value and its mutations to a named feature owner.
4. Migrate one end-to-end feature at a time, checking callers and live wiring. Keep data formats, navigation, errors, ordering and operation lifetimes stable. Remove superseded wiring only once all callers have moved.
5. Build and run relevant regression checks at each meaningful boundary. Compare final ownership against the specification’s review checklist and explain any remaining transitional components.

Concurrency migration is a separate operation. Preserve current GCD/callback mechanisms during structural changes where possible. If a required CFA isolation boundary also needs concurrency changes outside the requested scope, identify that dependency and obtain scope clarification before proceeding with those changes. When both operations are requested, use distinct checkpoints and validation for each; do not silently turn architecture adoption into a whole-app concurrency rewrite.

Deliver a before/after ownership map, behaviour evidence and any remaining migration ledger. Existing CFA feature enhancements may use the same rules at feature scope without restructuring the whole app.

## Shared Swift coding standards

Read the [Swift coding guide](references/swift-coding-guide.md) before implementing or reviewing Swift. Apply its rules for crash safety, shared model decisions, declarative Views, KISS, errors, concurrency, responsiveness and verification within this workflow's authorized scope. Treat forced operations as explicit crash decisions; never infer permission to retain them merely because they appear safe. Read-only reviews report violations rather than editing code.
