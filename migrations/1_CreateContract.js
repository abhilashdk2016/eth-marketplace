const Migrations = artifacts.require("CourseMarketPlaceAbhilashDK");

module.exports = function (deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Migrations);
}