import Foundation
import Observation

@MainActor
@Observable
final class GitReposViewModel {
    private let gitReposFeature: GitReposManager

    init(feature: GitReposManager = AppModel.shared.gitReposFeature) {
        self.gitReposFeature = feature
    }

    var repos: [Repo] {
        gitReposFeature.repos
    }

    var isRefreshing: Bool {
        gitReposFeature.isRefreshing
    }

    var refreshFailureMessage: String? {
        gitReposFeature.refreshError?.localizedDescription
    }

    func refresh() async {
        await gitReposFeature.refresh()
    }
}
