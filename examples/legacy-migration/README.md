# Legacy migration exercise

Use a disposable copy of an existing GCD application you are authorised to modify.
Invoke `$swift-concurrency-migration` for concurrency changes, or
`$cfa-architecture-adoption` for CFA restructuring, and supply its intended behaviour, supported targets and
bundle identity. The skill's `references/legacy-application-migration.md` defines
staged migration and verification; `product-behaviour-contract.md` defines the
behaviour evidence to retain. Both are bundled with the skill.

Begin with a build/test baseline and a behaviour contract. Keep architecture
restructuring separate from concurrency conversion. Record existing failures and
manual checks that cannot be performed. Do not treat the architecture as permission
to redesign the product or replace its persistence format.

No real customer's legacy source or historical Trend report is distributed here.
