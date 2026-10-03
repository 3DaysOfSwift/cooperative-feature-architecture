import Foundation

extension Date {
    var abbreviatedDateTime: String {
        formatted(date: .abbreviated, time: .shortened)
    }
}
