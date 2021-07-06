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
    await token.transfer(ethSwap.address,  '1000000000000000000000000');
    await token2.transfer(ethSwap.address, '1000000000000000000000000');
    await token3.transfer(ethSwap.address, '1000000000000000000000000');

    console.log('Quant tokens 1 exchange')
    console.log((await token.balanceOf(ethSwap.address)).toString());
    console.log('Quant tokens 2 exchange')
    console.log((await token2.balanceOf(ethSwap.address)).toString());
    console.log('Quant tokens 3 exchange')
    console.log((await token3.balanceOf(ethSwap.address)).toString());

    const accounts = [
        '0x6Bfe867d3BaEFf60122441eBd38f6331Ba1423E4',
        '0xBE514F502E3Bd956e24c5742b02809c7Dab8Dc40',
        '0x32f174056c89dAB87bb39562b599A3b7264eF37b',
        '0x2b976aAaF63DAb696064d654b6850077c5C74a3c'
      ];

      // Meio milhão, valor máximo a ser distribuido 5000 por conta
      const quantTokens1ToAccounts = '2000' + '000000000000000000';
      const quantTokens2ToAccounts = '3000' + '000000000000000000';
      const quantTokens3ToAccounts = '1000' + '000000000000000000';

      for (let accountIndex = 0; accountIndex < accounts.length; accountIndex++) {
        console.log("Account " + accountIndex + "º " + accounts[accountIndex])
        await token.transfer(accounts[accountIndex], quantTokens1ToAccounts)
        await token2.transfer(accounts[accountIndex], quantTokens2ToAccounts)
        await token3.transfer(accounts[accountIndex], quantTokens3ToAccounts)
      }
};
