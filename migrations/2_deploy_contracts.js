const Token = artifacts.require("Token");
const Token2 = artifacts.require("Token2");
const Token3 = artifacts.require("Token3");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function(deployer) {
    // Deploy Token
    await deployer.deploy(Token);
    const token = await Token.deployed()

    await deployer.deploy(Token2);
    const token2 = await Token2.deployed()

    await deployer.deploy(Token3);
    const token3 = await Token3.deployed()

    // Deploy EthSwap
    await deployer.deploy(EthSwap, token.address, token2.address, token3.address);
    const ethSwap = await EthSwap.deployed()

    // Transfer all tokens to EthSwap (1 million)
    await token.transfer(ethSwap.address, '1000000000000000000000000')
    await token2.transfer(ethSwap.address, '1000000000000000000000000')
    await token3.transfer(ethSwap.address, '1000000000000000000000000')
};
