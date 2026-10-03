import SwiftUI

extension AppColourTheme {
    var preferredColorScheme: ColorScheme? {
        switch self {
        case .automatic: nil
        case .ocean: .dark
        case .graphite: .dark
        case .midnight: .dark
        case .systemGrey: .light
        }
    }

    func resolved(for colorScheme: ColorScheme) -> AppColourTheme {
        switch self {
        case .automatic:
            colorScheme == .dark ? .ocean : .systemGrey
        default:
            self
        }
    }

    var palette: ThemePalette {
        switch self {
        case .automatic:
            AppColourTheme.systemGrey.palette
        case .ocean:
            ThemePalette(
                background: Color(red: 0.04, green: 0.10, blue: 0.16),
                surface: Color(red: 0.08, green: 0.19, blue: 0.28),
                primaryText: .white,
                secondaryText: Color(red: 0.68, green: 0.80, blue: 0.88),
                accent: Color(red: 0.35, green: 0.84, blue: 0.82)
            )
        case .graphite:
            ThemePalette(
                background: Color(red: 0.08, green: 0.08, blue: 0.10),
                surface: Color(red: 0.16, green: 0.16, blue: 0.19),
                primaryText: Color(red: 0.95, green: 0.95, blue: 0.97),
                secondaryText: Color(red: 0.67, green: 0.67, blue: 0.72),
                accent: Color(red: 0.86, green: 0.70, blue: 0.28)
            )
        case .midnight:
            ThemePalette(
                background: Color(red: 0.03, green: 0.05, blue: 0.14),
                surface: Color(red: 0.08, green: 0.12, blue: 0.27),
                primaryText: Color(red: 0.94, green: 0.96, blue: 1.00),
                secondaryText: Color(red: 0.61, green: 0.69, blue: 0.88),
                accent: Color(red: 0.38, green: 0.58, blue: 1.00)
            )
        case .systemGrey:
            ThemePalette(
                background: Color(uiColor: .systemGroupedBackground),
                surface: Color(uiColor: .secondarySystemGroupedBackground),
                primaryText: Color(uiColor: .label),
                secondaryText: Color(uiColor: .secondaryLabel),
                accent: Color(uiColor: .systemBlue)
            )
        }
    }
}

struct ThemePalette {
    let background: Color
    let surface: Color
    let primaryText: Color
    let secondaryText: Color
    let accent: Color
}
