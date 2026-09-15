# Cooperative Feature Architecture toolkit

This is the independent CFA toolkit, not the Trend app. Maintain `architecture/cfa-specification.md`
as the canonical architecture and `tools/architecture-dashboard` as the canonical executable.
Run `node scripts/sync.mjs` to refresh generated skill dependencies. Never copy reports,
private source, absolute workstation paths or credentials into releases.

The public project identity is Cooperative Feature Architecture (CFA). Use the subtitle
“An AI-assisted iOS architecture toolkit for SwiftUI and Swift Concurrency.” AppModel is
the composition-root type, not the public product name. Respect a customer's bundle prefix.

Keep four independent workflows: app creation, architecture adoption, concurrency
migration, and read-only architecture review. Concurrency migration does not imply CFA
adoption; the dashboard is a tool used by review. Preserve user intent and existing app behaviour.

Run `npm test`, `npm run validate`, and `python3 scripts/release.py` for release changes.
All runtime dependencies must be packaged or stated as prerequisites. Test installation
in a temporary destination. Do not alter a real personal marketplace during tests.
Do not infer native host compatibility or public publication from a valid manifest.

Do not publish to a remote repository or release service without an explicit destination
and authorization. The source repository can be committed/tagged locally for preparation.
