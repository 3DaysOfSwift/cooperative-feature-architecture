import Observation

@MainActor
@Observable
final class ThemeManager {
    static let shared = ThemeManager(settingsFeature: AppModel.shared.settingsFeature)

    private let settingsFeature: SettingsManager

    init(settingsFeature: SettingsManager) {
        self.settingsFeature = settingsFeature
    }

    var selectedTheme: AppColourTheme {
        settingsFeature.selectedTheme
    }
}
