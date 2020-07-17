#!/usr/bin/env node

const parser = require('.')

console.log(parser.parse(process.argv.slice(2).join(' ')))
