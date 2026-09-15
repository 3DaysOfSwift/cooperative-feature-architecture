// Synthetic teaching fixture: ordinary domain values and explicit owners.
// This is a source-analysis example, not a complete runnable iPhone app.
import Foundation
import Observation

struct Note: Identifiable, Sendable {
    let id: UUID
    let text: String
}

enum NotesError: Error { case emptyText }

protocol NotesRepository: Sendable {
    func save(_ note: Note) async throws
}

actor MemoryNotesRepository: NotesRepository {
    private var notes: [Note] = []
    func save(_ note: Note) { notes.append(note) }
}

@MainActor protocol NotesFeature: AnyObject, Sendable {
    var notes: [Note] { get }
    func record(text: String) async throws
}

@MainActor @Observable final class NotesManager: NotesFeature {
    private(set) var notes: [Note] = []
    private let repository: any NotesRepository
    init(repository: any NotesRepository) { self.repository = repository }
    func record(text: String) async throws {
        guard !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { throw NotesError.emptyText }
        try Task.checkCancellation()
        let note = Note(id: UUID(), text: text)
        try await repository.save(note)
        // Publish a committed append even if cancellation arrived during the save.
        notes.append(note)
    }
}

@MainActor final class AppModel {
    static let shared = AppModel.live()
    let notesFeature: any NotesFeature
    init(notesFeature: any NotesFeature) { self.notesFeature = notesFeature }
    static func live() -> AppModel {
        AppModel(notesFeature: NotesManager(repository: MemoryNotesRepository()))
    }
}

@MainActor @Observable final class NotesViewModel {
    var draft = ""
    private(set) var error: String?
    private(set) var saving = false
    private let notes: any NotesFeature
    init(notes: any NotesFeature = AppModel.shared.notesFeature) { self.notes = notes }
    func save() async {
        guard !saving else { return }
        saving = true; defer { saving = false }
        do { try await notes.record(text: draft); draft = ""; error = nil }
        catch { self.error = error.localizedDescription }
    }
}
