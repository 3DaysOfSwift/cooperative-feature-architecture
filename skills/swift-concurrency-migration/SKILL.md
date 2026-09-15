---
name: swift-concurrency-migration
description: Migrate GCD, OperationQueue and callback-based iOS code to Swift Concurrency while preserving behaviour and the existing application architecture. Not a request to adopt CFA or SwiftUI.
---

# Swift Concurrency Migration

Replace legacy concurrency mechanisms by preserving their guarantees, not translating their syntax.

Read [migration workflow](references/concurrency-migration.md) and [product behaviour contract](references/product-behaviour-contract.md). This skill does not require CFA, AppModel, SwiftUI or a dashboard. Preserve the app’s existing architecture and UI observation system unless the user requests a separate change.

Inventory each queue, barrier, group, semaphore, operation and callback. Record protected state, ordering, lifetime, error delivery, cancellation and callback execution requirements. Establish a baseline before changing one bounded operation at a time.

Keep migrated operations directly awaitable. Use structured child tasks for work owned by a calling operation; give independent tasks explicit lifetime and cancellation owners. Bridge callbacks only when an appropriate native async API is unavailable, accounting for exactly-once completion and cancellation races.

Verify language mode, concurrency checking, default isolation and relevant SDK annotations instead of assuming async means off-main. Do not hide diagnostics with unjustified unchecked annotations. Preserve required ordering across suspension points and prevent obsolete results from overwriting newer state.

Completion requires an updated primitive inventory, relevant build/tests and evidence that behaviour was preserved. Record remaining legacy mechanisms and why they remain. A pure GCD application is a valid starting point. No dashboard or CFA conversion is a prerequisite.
