const fmt = require("sprintf-js").sprintf

/**
 * @param {boolean} predicate
 * @param {string | Function} Err
 * @param {any[]} ...format
 *
 * @throws {any} given Err when predicate is "true"
 */
function invariant(predicate, Err, ...format) {
  if (Boolean(predicate) === false) {
    return undefined
  }

  if (typeof Err === "string") {
    throw new Error(fmt(Err, ...format))
  }

  if (typeof Err === "function") {
    const message = format.shift()

    throw new Err(fmt(message, ...format))
  }

  throw Err
}

function reject(predicate, Err, ...format) {
  try {
    invariant(predicate, Err, ...format)

    return Promise.resolve(undefined)
  } catch (error) {
    return Promise.reject(error)
  }
}

invariant.reject = reject
module.exports = invariant
module.exports.reject = reject
module.exports.default = invariant
