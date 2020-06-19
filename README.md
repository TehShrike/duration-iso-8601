# duration-iso-8601

Parse ISO 8601 Duration(PnYnMnDTnHnMnS syntax)

https://en.wikipedia.org/wiki/ISO_8601#Durations

# Installation

```
npm install @tehshrike/duration-iso-8601
```

```
const parse = require('duration-iso-8601')
```

# Examples

<!--js
const parse = require('./index.js')
-->

```javascript
parse('P1Y2M3DT4H5M6S') // => { year: 1, month: 2, day: 3, hour: 4, minute: 5, second: 6 }

parse('P1Y30DT15M39S') // => { year: 1, day: 30, minute: 15, second: 39 }

parse('ieurht834') // => null
```
