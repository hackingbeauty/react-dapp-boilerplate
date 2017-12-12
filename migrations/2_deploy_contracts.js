var ProofOfExistence = artifacts.require("./ProofOfExistence.sol");

module.exports = function(deployer) {
  deployer.deploy(ProofOfExistence);
};
