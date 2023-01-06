'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var Lottery = artifacts.require('Lottery')
var migration = function (deployer) {
  deployer.deploy(Lottery)
}
module.exports = migration
//# sourceMappingURL=1_deploy_contracts.js.map
