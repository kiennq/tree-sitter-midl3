import XCTest
import SwiftTreeSitter
import TreeSitterMidl3

final class TreeSitterMidl3Tests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_midl3())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Midl3 grammar")
    }
}
