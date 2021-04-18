const prettierConfigStandard = require('prettier-config-standard')
const merge = require('lodash/merge')

const modifiedConfig = merge({}, prettierConfigStandard, {
    tabWidth: 4
})

module.exports = modifiedConfig
