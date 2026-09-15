# Minimal feature

`Notes.swift` is a synthetic source fixture showing a feature API, manager,
repository actor, AppModel factory and dedicated ViewModel. It is not a full Xcode
project and uses memory rather than durable storage. The append-only example does
not promise ordering between distinct concurrent callers. A read-modify-save
workflow would need an explicit operation-ordering contract.

Use it to smoke-test the scanner without commercial application source:

```sh
node tools/architecture-dashboard/src/cli.mjs examples/minimal-feature --out /tmp/cfa-example-report
```

Choose a new output directory each time. Review the source, not only the keyword counts.
