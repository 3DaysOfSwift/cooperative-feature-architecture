import Foundation

@MainActor
final class AppModel {
    static let shared = AppModel.live()

    let gitReposFeature: GitReposManager
    let settingsFeature: SettingsManager
    private var hasFinishedLaunching = false

    init(gitReposFeature: GitReposManager, settingsFeature: SettingsManager) {
        self.gitReposFeature = gitReposFeature
        self.settingsFeature = settingsFeature
    }

    func applicationDidFinishLaunching() async {
        guard !hasFinishedLaunching else { return }
        hasFinishedLaunching = true

        await gitReposFeature.refresh()
    }

    static func live() -> AppModel {
        do {
            let cachesDirectoryURL = try FileManager.default.url(
                for: .cachesDirectory,
                in: .userDomainMask,
                appropriateFor: nil,
                create: true
            )

            return AppModel(
                gitReposFeature: GitReposManager(
                    provider: GitHubAPI(),
                    cache: RepoFileCache(cacheDirectoryURL: cachesDirectoryURL)
                ),
                settingsFeature: SettingsManager()
            )
        } catch {
            preconditionFailure("Unable to open the Git Repositories cache directory: \(error.localizedDescription)")
        }
    }
}
