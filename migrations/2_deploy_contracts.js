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
    await token.transfer(ethSwap.address,  '51' + '000000000000000000'); // UCANA
    await token2.transfer(ethSwap.address, '34' + '000000000000000000'); // UCANU
    await token3.transfer(ethSwap.address, '50' + '000000000000000000'); // UCANE

    await ethSwap.sortInitialPivo();
  
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
        '0x2b976aAaF63DAb696064d654b6850077c5C74a3c',
        '0x327E301f1de40f107Ab7fA199A337ea5bC6eB351',
        '0xD53488049fafC8CE778b10e84bc836dBbf96c2A7',
        '0x7181C2d42F6b852B4fE6424f6a94Cc3e849270F3',
        '0x65298C3B11904ADd549c006FE80a93222205E198',
        '0x9641d7bEbF6916fD8A0316E3D9d0121d0802c742'
      ];

      // Meio milhão, valor máximo a ser distribuido 5000 por conta
      const quantTokens1ToAccounts = '20000' + '000000000000000000';
      const quantTokens2ToAccounts = '3' + '000000000000000000';
      const quantTokens3ToAccounts = '10000' + '000000000000000000';

      for (let accountIndex = 0; accountIndex < accounts.length; accountIndex++) {
        console.log("Account " + accountIndex + "º " + accounts[accountIndex])
        await token.transfer(accounts[accountIndex], quantTokens1ToAccounts)
        await token2.transfer(accounts[accountIndex], quantTokens2ToAccounts)
        await token3.transfer(accounts[accountIndex], quantTokens3ToAccounts)
      }
};
