// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterMidl3",
    products: [
        .library(name: "TreeSitterMidl3", targets: ["TreeSitterMidl3"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterMidl3",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterMidl3Tests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterMidl3",
            ],
            path: "bindings/swift/TreeSitterMidl3Tests"
        )
    ],
    cLanguageStandard: .c11
)
