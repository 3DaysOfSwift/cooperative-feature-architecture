import Foundation
import Observation

@MainActor
@Observable
final class SettingsViewModel {
    private let settingsFeature: SettingsManager

    init(feature: SettingsManager = AppModel.shared.settingsFeature) {
        self.settingsFeature = feature
    }

    func selectTheme(_ theme: AppColourTheme) {
        settingsFeature.selectTheme(theme)
    }

    var developerWebsiteURL: URL? {
        settingsFeature.developerWebsiteURL
    }

    var versionDescription: String {
        "Version \(settingsFeature.appVersion) (\(settingsFeature.buildNumber))"
    }
}
