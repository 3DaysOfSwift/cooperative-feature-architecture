# CFA skill evaluations

These small fixtures preserve behaviour that the Toolkit must maintain as its
skills evolve. They are not application templates and are not copied into a
developer's Xcode project.

Run `npm run evals` to check that every fixture has its expected outcome.
Before a CFA release, give the fixture and its ordinary-language request to an
installed AI host. Compare the response with the expected outcome. Record any
misrouting as a narrow skill correction rather than adding a generic router.

## Flat app

`flat-app` represents a generated SwiftUI prototype that mixes view state,
persistence and business work. A correct CFA response selects architecture
adoption and proposes real ownership boundaries before changing behaviour. It
must not describe the app as CFA merely because folders could be added.
