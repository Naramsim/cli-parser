const assert = require('assert')

const parser = require('.')

// Quick test
// console.log(parser.parse('--flag1 --flag1 arg1 --flag1'))

// Flags only
assert.deepEqual(
    parser.parse('--flag1'),
    {flag1: true}
)
assert.deepEqual(
    parser.parse(' --flag1 '),
    {flag1: true}
)
assert.deepEqual(
    parser.parse('--flag1 --flag2'),
    {flag1: true, flag2: true}
)

// Flags with single arguments
assert.deepEqual(
    parser.parse('--flag1 arg1'),
    {flag1: 'arg1'}
)
assert.deepEqual(
    parser.parse('--flag1 arg1 --flag2 arg2'),
    {flag1: 'arg1', flag2: 'arg2'}
)
assert.deepEqual(
    parser.parse('--flag1 1'),
    {flag1: 1}
)

// Same flag with multiple arguments
assert.deepEqual(
    parser.parse('--flag1 arg1 --flag1 arg2'),
    {flag1: ['arg1', 'arg2']}
)
assert.deepEqual(
    parser.parse('--flag1 arg1 --flag1 arg2 --flag2 arg3 --flag2 arg4'),
    {flag1: ['arg1', 'arg2'], flag2: ['arg3', 'arg4']}
)
assert.deepEqual(
    parser.parse('--flag1 1 --flag1 2 --flag2 3 --flag2 4'),
    {flag1: [1, 2], flag2: [3, 4]}
)

// https://github.com/wonderflow-bv/cli-args-parser-kata README tests
assert.deepEqual(
    parser.parse('--foo'),
    {"foo": true}
)
assert.deepEqual(
    parser.parse('--foo bar'),
    {"foo": "bar"}
)
assert.deepEqual(
    parser.parse('--number 1'),
    {"number": 1}
)
assert.deepEqual(
    parser.parse('--foo --bar baz --number 1'),
    {"bar": "baz", "foo": true, "number": 1}
)
assert.deepEqual(
    parser.parse('--foo --bar baz --bar zab --number 1'),
    {"bar": ["baz", "zab"], "foo": true, "number": 1}
)

// Overrides
assert.deepEqual(
    parser.parse('--flag1 --flag1 arg1 --flag1'),
    {"flag1": true }
)
