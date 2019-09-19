const basicTypes = [
  "null",
  "number",
  "object",
  "array",
  "string",
  "function",
  "undefined",
  "boolean"
]

/**
 * Get a string with type name of the given value
 *
 * @param {any} val
 *
 * @return {string}
 *
 * @api private
 */
function getTag(val) {
  const tag = Object.prototype.toString.call(val).slice(8, -1)

  if (basicTypes.includes(tag.toLowerCase())) {
    return tag.toLowerCase()
  }

  return tag
}

module.exports = getTag
