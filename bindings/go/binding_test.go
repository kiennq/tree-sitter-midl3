package tree_sitter_midl3_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_midl3 "github.com/kiennq/tree-sitter-midl3/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_midl3.Language())
	if language == nil {
		t.Errorf("Error loading Midl3 grammar")
	}
}
