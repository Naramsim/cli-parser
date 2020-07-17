#!/usr/bin/env node

let argv = require('yargs-parser')(process.argv.slice(2))
delete argv['_']
console.log(argv)
