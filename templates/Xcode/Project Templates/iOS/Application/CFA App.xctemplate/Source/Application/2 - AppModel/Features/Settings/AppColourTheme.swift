import Foundation

enum AppColourTheme: String, CaseIterable, Identifiable {
    case automatic
    case ocean
    case graphite
    case midnight
    case systemGrey

    var id: String { rawValue }

    var name: String {
        switch self {
        case .automatic: "Automatic"
        case .ocean: "Ocean"
        case .graphite: "Graphite"
        case .midnight: "Midnight"
        case .systemGrey: "System Grey"
        }
    }

}
