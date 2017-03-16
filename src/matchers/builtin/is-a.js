let _ = require('../../util/lodash-wrap')
let create = require('../create')
let stringifyArguments = require('../../stringify/arguments')

module.exports = create({
  name (matcherArgs) {
    let desc = _.get(matcherArgs[0], 'name') || stringifyArguments(matcherArgs)
    return `isA(${desc})`
  },
  matches (matcherArgs, actual) {
    let type = matcherArgs[0]

    if (type === Number) {
      return _.isNumber(actual)
    } else if (type === String) {
      return _.isString(actual)
    } else if (type === Boolean) {
      return _.isBoolean(actual)
    } else {
      return actual instanceof type
    }
  }
})
