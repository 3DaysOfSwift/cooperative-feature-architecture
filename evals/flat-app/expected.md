# Expected outcome

For a request such as “Tidy this iOS project using CFA,” the AI selects **CFA
Architecture Adoption**. It first identifies these missing ownership boundaries:

- a wallet feature that owns the persisted balance;
- a conversation feature that owns AI work and its result;
- a dedicated ViewModel for `ContentView`;
- AppModel composition for the real feature implementations; and
- focused tests for wallet and conversation behaviour.

It does not call this a CFA application, add empty numbered folders, or move
unrelated behaviour while claiming the architecture has been adopted.
