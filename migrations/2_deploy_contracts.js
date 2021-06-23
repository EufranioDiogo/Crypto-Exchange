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
        '0x53162D805b8E3A8b3914952fE10853b9F227Fe90',
        '0x55372aDA7F40Fc3120C14675a13FbFbE7Dd7Ba10',
        '0x6Bfe867d3BaEFf60122441eBd38f6331Ba1423E4',
        '0xBE514F502E3Bd956e24c5742b02809c7Dab8Dc40',
        '0x32f174056c89dAB87bb39562b599A3b7264eF37b',
        '0x2b976aAaF63DAb696064d654b6850077c5C74a3c',
        '0x327E301f1de40f107Ab7fA199A337ea5bC6eB351',
        '0xD53488049fafC8CE778b10e84bc836dBbf96c2A7',
        '0x7181C2d42F6b852B4fE6424f6a94Cc3e849270F3',
        '0x65298C3B11904ADd549c006FE80a93222205E198',
        '0x9641d7bEbF6916fD8A0316E3D9d0121d0802c742',
        '0xA2e2Bd550ac2e64eca4A836943E34e277cB3ec09',
        '0x1AD7853E2c1b7E628f4e0Ed08bca8cA552ac2f1e',
        '0x2Cfe0743dEA8Ae257786F8Ddda2376a26B04c15b',
        '0xe7E2a5251BE9c72B8DE714E99205F68354064434',
        '0xf6Cb6186E8e0e6eA31e8eB3Fe63d2eB41bB5929A',
        '0x03de5295076770ca1Eb5cc975e78E0b105c94F11',
        '0xfbA93361e867eFA6F1136F341f32eF6E003DFC6a',
        '0xfd9E6B1B52cffC6c05710885acb9c061970fA3f6',
        '0x02Cb02004045e7EAd10731B7EA76be6547968F2B',
        '0x3D9889240168388B4553eC0497Eb54aaaBc146D7',
        '0x8B027DfE3EF65F0E546E6AF9906090E575f44747',
        '0x949e90DE41a17465CD209315716b4558e1EEcca9',
        '0x2eF12f2a942844C72e75c753ebbea15aC3E7344b',
        '0x841d6CA9Ec65447Da0b1847426bed8354102fCe0',
        '0xDb75D7083dF3787EbD1386C1545f7CE18Ae8811B',
        '0x261f7C5E273ec8F132Ca1Ca5aB5D9A60cB858FC7',
        '0x6E861493603351176B4fe655d158391Eaf65e0F4',
        '0x1b17A7F66ebE75061B762A15F168964B17B7d9e2',
        '0x2A86ab0c041Ad13119743B882ee42959175EbF8F',
        '0xe0A496e136a5FB53FA527D36ec76C8e8A089FA13',
        '0x67402b0C3aD78b98D5ae6afAF5fF69697BBd0738',
        '0xeFe769396600242D7c152F69955389E5F01Cc220',
        '0x23F50aA131CC27D47153f1a402e689fF300Dc9d6',
        '0x54821049E5d8D3C10DC5dE872725Ec55c312C806',
        '0x23f34229dF38b0f6DEe81F6eDaBAD48433e328A3',
        '0xA1adFD15b6815bBDDCb0BAf21684877632fBE3AB',
        '0x939c9e3653BAe0821631bB80975d4cCFa4908dF6',
        '0x6EEfb36480C8b1265FfFbF8B434c6283c7224015',
        '0xaFc1Eb7962dCe61E8fbABB3747B30B7c168252e5',
        '0x83579Eb5424Bb009C016C4F304777AA49ae2dc13',
        '0xe30e56d29E19F4D0Be90290BB62AA5645c1d63aF',
        '0x4d9038a73F82f48820e18BA6EEcCe392305643E2',
        '0x0E8d58F9993541a698D81448cEd05267797694A5',
        '0xBe43A77bf97515ad8d32307787481EEf52a2C16C',
        '0x34585e84D9657Da8Dd02c1E35f8f7b5d1C4790F7',
        '0xdA3D0A60D4F061642727d1395687bF62cdC84fD9',
        '0xCf8eE42DE1eB705392d80F5944e5830E5c40C86e',
        '0xD024788e991a4D5Ea4a4cD6053d1541d96E04f15',
        '0x141C654087d937dA3D845754fAabb7294a7c90F7',
        '0x55926358D13545A1D161A1Ea1af9F2167f97fc7F',
        '0xd205a869f50c5cb3d43443882a0258eAeCB0Df04',
        '0xBafFb370D23e5F87478B939535fC13961210243B',
        '0xdCa45C93c005E6fc3C8E8B783A3aF2B2fbB67e06',
        '0xd59CaC065EA66ad27ddA4D2D154C0aB842eB1Cb2',
        '0x6bC5c579d0826Da32a2b5c7A91dE1d62036c6049',
        '0x4E7CF2c3D3B7F9dF5e86efcfa629fEFE3d7836EE',
        '0x3Ee6e599C6D4eD8bEdE1F624029a6f92823eFDC6',
        '0x8b3Dcc403fF89CB4CBee653e36e9BF06c3F7fA09',
        '0x765b689D109a7b225d46161885F75083ccC78dDE',
        '0x314855f77Aa7DBD17BA455CDFc44809cC3b34e2C',
        '0x493888B87d4a2Fa3cB3D875117eCc4e696235954',
        '0xCec4831bb2fb5D70822Ae96FdDf35CE5f52334F4',
        '0x575e0A45a1d66BbDa3BFaeE1B4834bcE47047ebB',
        '0xD2d5207c00fa165cb6781d63BD11AD547c6575ab',
        '0x9A9AD7CDdF5B29Df34049301BF2fabA26a8641b9',
        '0x80E3BcBeF6cB051f8172F4E97cD470885d185B76',
        '0x3434f3F9D4C2785a511Ed70659131d0549597B81',
        '0x7692EA77440dbf790487a6A94b24D9F6DE48B776',
        '0x1fC1301DE7573D11E0F181640f99eB57E47C566C',
        '0x2e69624ef195031B15eCB596C74c6eA7e347E0A5',
        '0xD27FC12014Aef4AA15dFf2500FCf34643b58A762',
        '0xB44760Eb50cb0ce00f55D4C83A6155ca6F545Ae4',
        '0xc1FD837990EdfEc2988b15f6Ee9Ba9e93A3DA346',
        '0x53EB6C341392002c63207220a4Ca5970E03eBB21',
        '0x463200B5251f28adD714886f11097CA376b448E1',
        '0x097E4Eecdf2f4cDa52EA63422304553869345e3B',
        '0x11E224fb7FaD33eB9cC1634B770A17b12B52c2f9',
        '0xD99d988fD7307388186D86511445a79fD3DB97e0',
        '0x9d92b4EB2C16e22a2010E5bb26685A6834ebBa86',
        '0x2f0Df78E1c08755D98E7a6234FD78C76Bc7122a8',
        '0xE708F76F34397F2ABf8C0fae67e4f85480b3ebad',
        '0xDd37513D10Db2A9154473DC3Be3f9f51d7C3Cf16',
        '0x8255E109a243A17e325C6E55b8311F6F05223140',
        '0x32cD27E433c59b3973006B947F6F139E8C11E2dD',
        '0x8015A02ca0668467b9Ee9742967374afaC4376AB',
        '0xB5fbaCb83f367Ab8f7a283CF2B3Cb5Ef32Ecc55F',
        '0x49BC07fee101411e176682A70aF2dB33F77B8faA',
        '0x3e3454e25028681D0E55d96f95fAAEdeA273fE14',
        '0x6c3bC341a5c78271868E5b7c6351ffD917Dcc828',
        '0xd8A30Ed77E72AA12d4EEb815f2c1Ab95eBC9f6ea',
        '0x9A532037A6000447AA549623A21Cf4B60eC43d3D',
        '0x4BDcFCdC354a7cBa46E3B083cC3A9C3241185175',
        '0x5eEC98Af713C8aBFA48417104eFd733Bd713cC10',
        '0xfED89be91d8992163b28393744875BECD77D9f68',
        '0x5Af2FfB551F286475253A519570c437BF62E2a53',
        '0x5a4B060191b1407Ad20A92924734d2ad8b563755',
        '0x826ac0a84a54F45C18aD398c12734e1a3bB49113',
        '0x563a9756E836cfD53ADf8b46800999D80232B8A9',
        '0xA8ae2E1D67115d7742bf55bB4a42cF300E91840C'
      ];

      // Meio milhão, valor máximo a ser distribuido 5000 por conta
      const quantTokens1ToAccounts = '2000' + '000000000000000000';
      const quantTokens2ToAccounts = '2000' + '000000000000000000';
      const quantTokens3ToAccounts = '2000' + '000000000000000000';

      for (let accountIndex = 0; accountIndex < accounts.length - 95; accountIndex++) {
        await token.transfer( accounts[accountIndex], quantTokens1ToAccounts)
        await token2.transfer(accounts[accountIndex], quantTokens2ToAccounts)
        await token3.transfer(accounts[accountIndex], quantTokens3ToAccounts)
      }
};
