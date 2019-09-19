const isNaN = require("./isNaN")
const isNumber = require("./isNumber")
const getTag = require("./getTag")

const isArray = Array.isArray

const hasNumKey = entries => entries.find(
  ([path]) => isNumber(path) || (isArray(path) && isNumber(path[0]))
)

/**
 * @param {array|object} target
 * @param {array} path
 * @param {any} value
 *
 * @return {array|object}
 *
 * @api private
 */
function deepFromEntries(target, path, value) {
  const key = path.shift()
  const curr = isNaN(key) ? {} : []

  if (!target) {
    if (path.length === 0) {
      curr[key] = value

      return curr
    }

    curr[key] = deepFromEntries(curr[key], path, value)

    return curr
  }

  if (path.length === 0) {
    target[key] = value

    return target
  }

  target[key] = deepFromEntries(target[key], path, value)

  return target
}

/**
 * Create an object from given entries
 *
 * @param {array} entries
 *
 * @return {object}
 *
 * @api public
 *
 * @example
 *
 * const entries = [
 *   [
 *     ["name"], "John Doe"
 *   ],
 *   [
 *     ["age"], 25
 *   ],
 *   [
 *     ["gender"], "Male"
 *   ]
 * ]
 *
 * objectDeepFromEntries(entries)
 * // -> {name: "John Doe", age: 25, gender: "Male"}
 */
function objectDeepFromEntries(entries) {
  if (!isArray(entries)) {
    throw new TypeError(
      `Expected an array of entries. Received ${getTag(entries)}`
    )
  }

  let res = {}
  let isCollection = false

  if (hasNumKey(entries)) {
    res = []
    isCollection = true
  }

  for (const entry of entries) {
    let path = entry[0]
    const value = entry[1]

    if (!isArray(path)) {
      path = [path]
    }

    const root = path.shift()

    if (path.length < 1 && (isCollection && isNaN(root))) {
      res.push({[root]: value})
    } else if (path.length < 1) {
      res[root] = value
    } else if (isCollection && isNaN(root)) {
      res.push({[root]: deepFromEntries(res[root], path, value)})
    } else {
      res[root] = deepFromEntries(res[root], path, value)
    }
  }

  return res
}

module.exports = objectDeepFromEntries
module.exports.default = objectDeepFromEntries
