import SwiftUI

// Deliberately non-CFA source used to check that CFA guidance does not mistake
// a flat generated prototype for an architecture.
@main
struct FlatApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @State private var balance = 10
    @State private var messages: [String] = []

    var body: some View {
        VStack {
            Text("\(balance) coins")
            Button("Spend") {
                balance -= 1
                UserDefaults.standard.set(balance, forKey: "balance")
                Task {
                    messages.append("AI response")
                }
            }
        }
    }
}
