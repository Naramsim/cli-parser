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
