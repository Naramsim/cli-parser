#!/usr/bin/env node

const isString = value => typeof value === 'string'
const isArray = value => Array.isArray(value)
const sanitize = string => string.trim()
const tokenize = string => string.split(' ')

const isAndGetFlag = string => {
    if (string.startsWith('--') && string.length >= 3) {
        return string.slice(2)
    }
    return false
}

const isAndGetArgument = string => {
    if (! string.startsWith('--')) {
        return string
    }
    return false
}

// Add a value at the position `key` inside `store`
// They type of this value can change based on what was previously there.
const addArgumentToFlag = (store, key, value) => {
    if (isArray(store[key])) {  
        store[key].push(value)
    } else if (isString(store[key])) {
        store[key] = [store[key], value]
    } else {
        store[key] = value
    }
}

function parse(cliOptsString='') {
    if (cliOptsString === '') {
        return {}
    }
    if (!isString(cliOptsString)) {
        throw new TypeError(`Expected a string, got \`${cliOptsString}\` (${typeof cliOptsString})`)
    }
    
    const store = {}
    cliOptsString = sanitize(cliOptsString)
    const tokens = tokenize(cliOptsString)
    //Loop over the entire tokens, ingesting and popping them from the array `tokens` with methods such as:
    // .shift() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
    while (tokens.length >= 1) {
        currentToken = tokens.shift() // `.shift()` removes the first element of an array so that `tokens[0]` is the item following `currentToken`
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
