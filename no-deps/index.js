#!/usr/bin/env node

const isString = value => typeof value === 'string'

const isAndGetFlag = value => {
    if (value.startsWith('--') && value.length >= 3) {
        return value.slice(2)
    }
    return false
}

const sanitize = string => string.trim()

const tokenize = string => string.split(' ')

function parse(cliOptsString='') {
    const store = {}
    if (cliOptsString === '') {
        return {}
    }
    if (!isString(cliOptsString)) {
        throw new Error(`Expected a string, got \`${cliOptsString}\` (${typeof cliOptsString})`)
    }
    cliOptsString = sanitize(cliOptsString)
    let tokens = tokenize(cliOptsString)
    while (tokens.length >= 1) {
        currentToken = tokens.shift()
        flag = isAndGetFlag(currentToken)
        if (flag && (tokens.length <= 0 || isAndGetFlag(tokens[0]))) {
            store[flag] = true
        }
    }
    return store
}

const parser = {
    parse
}

module.exports = parser
