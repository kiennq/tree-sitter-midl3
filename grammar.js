/**
 * @file midl3 grammar for tree-sitter
 * @author Kien Nguyen
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'midl3',

  extras: $ => [
    /\s/,  // Ignore whitespace
    "\r",
    '(',
    ')',
    ':',
    $.comment_line,
    $.comment_block,
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.import,
      $.preprocessor,
      $.comment,
      $.namespace,
      $.type_declaration,
      $.type,
      $.identifier,
      $.property_accessor,
      $.builtin_type,
      $.attribute,
      $.block,
      ';',
    ),

    import: _ => token(prec(1, 'import')),

    preprocessor: _ => token(prec(1, seq(
      '#',
      choice('include', 'define', 'ifdef', 'ifndef', 'if', 'else', 'endif', 'pragma')
    ))),

    comment: $ => choice(
      $.comment_line,
      $.comment_block,
    ),

    comment_line: _ => token(prec(1, seq('//', /.*/))),

    comment_block: _ => token(prec(1, seq(
      '/*',
      /[^*]*\*+([^/*][^*]*\*+)*/,
      '/',
    ))),

    type_identifier: _ => token(prec(1, /(\w[\w\d_]*)/)),

    type_declaration: $ => seq(
      token(prec(1, choice(
        'runtimeclass', 'interface', 'enum', 'struct',
      ))),
      choice($.type_identifier, prec(100, $.builtin_type)),
      repeat($.identifier),
      choice($.block, ';'),
    ),

    namespace_identifier: _ => token(prec(1, /(\w[\w\d_]*)/)),
    namespace: $ => prec.right(seq(
      token(prec(1, 'namespace')),
      $.namespace_identifier,
      choice(
        $.block,
        optional(';'),
      ),
    )),

    type: _ => token(prec(1, choice(
      'delegate', 'event',
    ))),

    builtin_type: _ => token(prec(1, choice(
      'Int16', 'Int32', 'Int64', 'UInt8', 'UInt16', 'UInt32', 'UInt64', 'Char', 'String', 'Single', 'Double', 'Boolean', 'Guid', 'void',
    ))),

    identifier: _ => token(prec(1, /(\w[\w\d_]*\.)*(\w[\w\d_]*)/)),

    property_accessor: _ => token(prec(1, choice('get', 'set'))),

    attribute: _ => seq(
      '[',
      repeat(/[^]]/),
      ']',
    ),

    block: $ => seq(
      '{',
      repeat($._statement),
      '}',
    ),
  }
});
