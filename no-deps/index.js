#!/usr/bin/env node

const isString = value => typeof value === 'string'

const isAndGetFlag = value => {
    if (value.startsWith('--') && value.length >= 3) {
        return value.slice(2)
    }
    return false
}

const isAndGetArgument = string => {
    if (! string.startsWith('--')) {
        return string
    }
    return false
}

const sanitize = string => string.trim()

const tokenize = string => string.split(' ')

const addArgumentToFlag = (store, key, value) => {
    if (Array.isArray(store[key])) {
        store[key].push(value)
    } else if (isString(store[key])) {
        store[key] = [store[key], value]
    } else {
        // TODO: what if it was a boolean flag? 
        store[key] = value
    }
}

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
        nextToken = tokens[0] // TODO: decide whether to use it
        flag = isAndGetFlag(currentToken)
        if (flag && (tokens.length <= 0 || isAndGetFlag(tokens[0]))) {
            store[flag] = true
        }
        if (flag && tokens.length >= 1 && isAndGetArgument(tokens[0])) {
            const value = tokens.shift()
            addArgumentToFlag(store, flag,value )
        }
    }
    return store
}

const parser = {
    parse
}

module.exports = parser
