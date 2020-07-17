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
