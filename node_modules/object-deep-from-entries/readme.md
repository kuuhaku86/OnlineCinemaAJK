# object-deep-from-entries

Make an object or collection from entries deeply.

[![devDependencies Status](https://david-dm.org/octet-stream/object-deep-from-entries/dev-status.svg)](https://david-dm.org/octet-stream/object-deep-from-entries?type=dev)
[![Build Status](https://travis-ci.org/octet-stream/object-deep-from-entries.svg?branch=master)](https://travis-ci.org/octet-stream/object-deep-from-entries)
[![Code Coverage](https://codecov.io/github/octet-stream/object-deep-from-entries/coverage.svg?branch=master)](https://codecov.io/github/octet-stream/object-deep-from-entries?branch=master)

## Installation

You can install this package from Yarn:

```sh
yarn add object-deep-from-entries
```

Or NPM:

```sh
# Since ~5.x version you can omit the --save flag
npm install object-deep-from-entries
```

## API

`objectDeepFromEntries(entries) -> {object | object[] | any[]}`

  * **{Array<[string | number | Array<string | number>, any]>}** – An array of
    tuples with paths and values. Path might be a **string**,
    **number** or an **array** of those to types. Value may have any type.

### Usage

```js
import objectDeepFromEntries from "object-deep-from-entries"

// You can create a flat object using entries in the same format
const flat = [
  [
    "name", "John Doe"
  ],
  [
    "age", 25
  ],
  [
    "gender", "Male"
  ]
]

objectDeepFromEntries(flat)
// -> {name: "John Doe", age: 25, gender: "Male"}

// This function is also useful for making "deep" objects. Let's take a look:
const deep = [
  [
    "name", "John Doe"
  ],
  [
    ["skills", 0], "Node.js"
  ],
  [
    ["skills", 1], "JavaScript"
  ],
  [
    ["skills", 2], "Preact"
  ]
]

objectDeepFromEntries(deep)
// -> {name: "John Doe", skills: [Node.js, "JavaScript", "Preact"]}
```
