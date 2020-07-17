# no-deps

This simple scripts doesn't use any dependency.

## Usage

```js
const parser = require('.')
parameters = parser.parse('--cpu 3 --restart always --privileged')
console.log(parameters)
// {cpu: 3, restart: 'always', privileged: true}
```

## Run

```sh
node cli.js --cpu 3 --restart always --privileged
# {cpu: 3, restart: 'always', privileged: true}
```

## Test

```sh
npm test
```
