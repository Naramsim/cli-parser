const assert = require('assert')

const parser = require('.')

//console.log(parser.parse('--asd --'))

// Flags only
assert.deepEqual(
    parser.parse('--asd'),
    {asd: true}
)
assert.deepEqual(
    parser.parse(' --asd '),
    {asd: true}
)
assert.deepEqual(
    parser.parse('--asd --qwe'),
    {asd: true, qwe: true}
)

// Flags with single arguments
assert.deepEqual(
    parser.parse('--asd miao'),
    {asd: 'miao'}
)
assert.deepEqual(
    parser.parse('--asd miao --qwe poi'),
    {asd: 'miao', qwe: 'poi'}
)
assert.deepEqual(
    parser.parse('--asd 1'),
    {asd: 1}
)

// Same flag with multiple arguments
assert.deepEqual(
    parser.parse('--asd miao --asd bau'),
    {asd: ['miao', 'bau']}
)
assert.deepEqual(
    parser.parse('--asd miao --asd bau --qwe poi --qwe ipo'),
    {asd: ['miao', 'bau'], qwe: ['poi', 'ipo']}
)
assert.deepEqual(
    parser.parse('--asd 1 --asd 2 --qwe 3 --qwe 4'),
    {asd: [1, 2], qwe: [3, 4]}
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