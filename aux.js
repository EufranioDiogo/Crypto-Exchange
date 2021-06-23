Contract {
    setProvider: [Function(anonymous)],
        currentProvider: [Getter / Setter],
            _requestManager: RequestManager {
        provider: HttpProvider {
            withCredentials: false,
                timeout: 0,
                    headers: undefined,
                        agent: undefined,
                            connected: true,
                                host: 'http://127.0.0.1:7545',
                                    httpAgent: [Agent]
        },
        providers: {
            WebsocketProvider: [Function: WebsocketProvider],
                HttpProvider: [Function: HttpProvider],
                    IpcProvider: [Function: IpcProvider]
        },
        subscriptions: Map(0) { }
    },
    givenProvider: null,
        providers: {
        WebsocketProvider: [Function: WebsocketProvider],
            HttpProvider: [Function: HttpProvider],
                IpcProvider: [Function: IpcProvider]
    },
    _provider: HttpProvider {
        withCredentials: false,
            timeout: 0,
                headers: undefined,
                    agent: undefined,
                        connected: true,
                            host: 'http://127.0.0.1:7545',
                                httpAgent: Agent {
            _events: [Object: null prototype],
                _eventsCount: 2,
                    _maxListeners: undefined,
                        defaultPort: 80,
                            protocol: 'http:',
                                options: [Object],
                                    requests: { },
            sockets: { },
            freeSockets: [Object],
                keepAliveMsecs: 1000,
                    keepAlive: true,
                        maxSockets: Infinity,
                            maxFreeSockets: 256,
                                scheduling: 'fifo',
                                    maxTotalSockets: Infinity,
                                        totalSocketCount: 0,
                                            [Symbol(kCapture)]: false
        }
    },
    setRequestManager: [Function(anonymous)],
        BatchRequest: [Function: bound Batch],
            extend: [Function: ex] {
        formatters: {
            inputDefaultBlockNumberFormatter: [Function: inputDefaultBlockNumberFormatter],
                inputBlockNumberFormatter: [Function: inputBlockNumberFormatter],
                    inputCallFormatter: [Function: inputCallFormatter],
                        inputTransactionFormatter: [Function: inputTransactionFormatter],
                            inputAddressFormatter: [Function: inputAddressFormatter],
                                inputPostFormatter: [Function: inputPostFormatter],
                                    inputLogFormatter: [Function: inputLogFormatter],
                                        inputSignFormatter: [Function: inputSignFormatter],
                                            inputStorageKeysFormatter: [Function: inputStorageKeysFormatter],
                                                outputProofFormatter: [Function: outputProofFormatter],
                                                    outputBigNumberFormatter: [Function: outputBigNumberFormatter],
                                                        outputTransactionFormatter: [Function: outputTransactionFormatter],
                                                            outputTransactionReceiptFormatter: [Function: outputTransactionReceiptFormatter],
                                                                outputBlockFormatter: [Function: outputBlockFormatter],
                                                                    outputLogFormatter: [Function: outputLogFormatter],
                                                                        outputPostFormatter: [Function: outputPostFormatter],
                                                                            outputSyncingFormatter: [Function: outputSyncingFormatter]
        },
        utils: {
            _fireError: [Function: _fireError],
                _jsonInterfaceMethodToString: [Function: _jsonInterfaceMethodToString],
                    _flattenTypes: [Function: _flattenTypes],
                        randomHex: [Function: randomHex],
                            _: [Function],
                                BN: [Function],
                                    isBN: [Function: isBN],
                                        isBigNumber: [Function: isBigNumber],
                                            isHex: [Function: isHex],
                                                isHexStrict: [Function: isHexStrict],
                                                    sha3: [Function],
                                                        sha3Raw: [Function: sha3Raw],
                                                            keccak256: [Function],
                                                                soliditySha3: [Function: soliditySha3],
                                                                    soliditySha3Raw: [Function: soliditySha3Raw],
                                                                        encodePacked: [Function: encodePacked],
                                                                            isAddress: [Function: isAddress],
                                                                                checkAddressChecksum: [Function: checkAddressChecksum],
                                                                                    toChecksumAddress: [Function: toChecksumAddress],
                                                                                        toHex: [Function: toHex],
                                                                                            toBN: [Function: toBN],
                                                                                                bytesToHex: [Function: bytesToHex],
                                                                                                    hexToBytes: [Function: hexToBytes],
                                                                                                        hexToNumberString: [Function: hexToNumberString],
                                                                                                            hexToNumber: [Function: hexToNumber],
                                                                                                                toDecimal: [Function: hexToNumber],
                                                                                                                    numberToHex: [Function: numberToHex],
                                                                                                                        fromDecimal: [Function: numberToHex],
                                                                                                                            hexToUtf8: [Function: hexToUtf8],
                                                                                                                                hexToString: [Function: hexToUtf8],
                                                                                                                                    toUtf8: [Function: hexToUtf8],
                                                                                                                                        stripHexPrefix: [Function: stripHexPrefix],
                                                                                                                                            utf8ToHex: [Function: utf8ToHex],
                                                                                                                                                stringToHex: [Function: utf8ToHex],
                                                                                                                                                    fromUtf8: [Function: utf8ToHex],
                                                                                                                                                        hexToAscii: [Function: hexToAscii],
                                                                                                                                                            toAscii: [Function: hexToAscii],
                                                                                                                                                                asciiToHex: [Function: asciiToHex],
                                                                                                                                                                    fromAscii: [Function: asciiToHex],
                                                                                                                                                                        unitMap: [Object],
                                                                                                                                                                            toWei: [Function: toWei],
                                                                                                                                                                                fromWei: [Function: fromWei],
                                                                                                                                                                                    padLeft: [Function: leftPad],
                                                                                                                                                                                        leftPad: [Function: leftPad],
                                                                                                                                                                                            padRight: [Function: rightPad],
                                                                                                                                                                                                rightPad: [Function: rightPad],
                                                                                                                                                                                                    toTwosComplement: [Function: toTwosComplement],
                                                                                                                                                                                                        isBloom: [Function: isBloom],
                                                                                                                                                                                                            isUserEthereumAddressInBloom: [Function: isUserEthereumAddressInBloom],
                                                                                                                                                                                                                isContractAddressInBloom: [Function: isContractAddressInBloom],
                                                                                                                                                                                                                    isTopic: [Function: isTopic],
                                                                                                                                                                                                                        isTopicInBloom: [Function: isTopicInBloom],
                                                                                                                                                                                                                            isInBloom: [Function: isInBloom],
                                                                                                                                                                                                                                compareBlockNumbers: [Function: compareBlockNumbers]
        },
        Method: [Function: Method]
    },
    clearSubscriptions: [Function(anonymous)],
        options: { address: [Getter / Setter], jsonInterface: [Getter / Setter] },
    handleRevert: [Getter / Setter],
        defaultCommon: [Getter / Setter],
            defaultHardfork: [Getter / Setter],
                defaultChain: [Getter / Setter],
                    transactionPollingTimeout: [Getter / Setter],
                        transactionConfirmationBlocks: [Getter / Setter],
                            transactionBlockTimeout: [Getter / Setter],
                                defaultAccount: [Getter / Setter],
                                    defaultBlock: [Getter / Setter],
                                        methods: {
        name: [Function: bound _createTxObject],
            '0x06fdde03': [Function: bound _createTxObject],
                'name()': [Function: bound _createTxObject],
                    rate: [Function: bound _createTxObject],
                        '0x2c4e722e': [Function: bound _createTxObject],
                            'rate()': [Function: bound _createTxObject],
                                token1: [Function: bound _createTxObject],
                                    '0xd21220a7': [Function: bound _createTxObject],
                                        'token1()': [Function: bound _createTxObject],
                                            token2: [Function: bound _createTxObject],
                                                '0x25be124e': [Function: bound _createTxObject],
                                                    'token2()': [Function: bound _createTxObject],
                                                        token3: [Function: bound _createTxObject],
                                                            '0xef14101e': [Function: bound _createTxObject],
                                                                'token3()': [Function: bound _createTxObject],
                                                                    buyTokens: [Function: bound _createTxObject],
                                                                        '0xd0febe4c': [Function: bound _createTxObject],
                                                                            'buyTokens()': [Function: bound _createTxObject],
                                                                                sellTokens: [Function: bound _createTxObject],
                                                                                    '0x6c11bcd3': [Function: bound _createTxObject],
                                                                                        'sellTokens(uint256)': [Function: bound _createTxObject],
                                                                                            helloWorld: [Function: bound _createTxObject],
                                                                                                '0xc605f76c': [Function: bound _createTxObject],
                                                                                                    'helloWorld()': [Function: bound _createTxObject]
    },
    events: {
        TokensPurchased: [Function: bound],
            '0x6faf93231a456e552dbc9961f58d9713ee4f2e69d15f1975b050ef0911053a7b': [Function: bound],
                'TokensPurchased(address,address,uint256,uint256)': [Function: bound],
                    TokensSold: [Function: bound],
                        '0x697c42d55a5e1fed3f464ec6f38b32546a0bd368dc8068b065c67566d73f3290': [Function: bound],
                            'TokensSold(address,address,uint256,uint256)': [Function: bound],
                                allEvents: [Function: bound]
    },
    _address: '0x53162D805b8E3A8b3914952fE10853b9F227Fe90',
        _jsonInterface: [
            {
                inputs: [Array],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'constructor',
                constant: undefined
            },
            {
                anonymous: false,
                inputs: [Array],
                name: 'TokensPurchased',
                type: 'event',
                constant: undefined,
                payable: undefined,
                signature: '0x6faf93231a456e552dbc9961f58d9713ee4f2e69d15f1975b050ef0911053a7b'
            },
            {
                anonymous: false,
                inputs: [Array],
                name: 'TokensSold',
                type: 'event',
                constant: undefined,
                payable: undefined,
                signature: '0x697c42d55a5e1fed3f464ec6f38b32546a0bd368dc8068b065c67566d73f3290'
            },
            {
                constant: true,
                inputs: [],
                name: 'name',
                outputs: [Array],
                payable: false,
                stateMutability: 'view',
                type: 'function',
                signature: '0x06fdde03'
            },
            {
                constant: true,
                inputs: [],
                name: 'rate',
                outputs: [Array],
                payable: false,
                stateMutability: 'view',
                type: 'function',
                signature: '0x2c4e722e'
            },
            {
                constant: true,
                inputs: [],
                name: 'token1',
                outputs: [Array],
                payable: false,
                stateMutability: 'view',
                type: 'function',
                signature: '0xd21220a7'
            },
            {
                constant: true,
                inputs: [],
                name: 'token2',
                outputs: [Array],
                payable: false,
                stateMutability: 'view',
                type: 'function',
                signature: '0x25be124e'
            },
            {
                constant: true,
                inputs: [],
                name: 'token3',
                outputs: [Array],
                payable: false,
                stateMutability: 'view',
                type: 'function',
                signature: '0xef14101e'
            },
            {
                constant: false,
                inputs: [],
                name: 'buyTokens',
                outputs: [],
                payable: true,
                stateMutability: 'payable',
                type: 'function',
                signature: '0xd0febe4c'
            },
            {
                constant: false,
                inputs: [Array],
                name: 'sellTokens',
                outputs: [],
                payable: true,
                stateMutability: 'payable',
                type: 'function',
                signature: '0x6c11bcd3'
            },
            {
                constant: true,
                inputs: [],
                name: 'helloWorld',
                outputs: [Array],
                payable: false,
                ed.bola ~/Downloads/EXCHANGE / ucan_exchange - master > node server.js 
  TruffleContract {
                constructor: [Function: TruffleContract] {
                _constructorMethods: {
                    setProvider: [Function: setProvider],
                    new: [Function: new],
                    at: [AsyncFunction: at],
                    deployed: [AsyncFunction: deployed],
                    defaults: [Function: defaults],
                    hasNetwork: [Function: hasNetwork],
                    isDeployed: [Function: isDeployed],
                    detectNetwork: [AsyncFunction: detectNetwork],
                    setNetwork: [Function: setNetwork],
                    setNetworkType: [Function: setNetworkType],
                    setWallet: [Function: setWallet],
                    resetAddress: [Function: resetAddress],
                    link: [Function: link],
                    clone: [Function: clone],
                    addProp: [Function: addProp],
                    toJSON: [Function: toJSON],
                    decodeLogs: [Function: decodeLogs]
                },
                _properties: {
                    contract_name: [Object],
                    contractName: [Object],
                    gasMultiplier: [Object],
                    timeoutBlocks: [Object],
                    autoGas: [Object],
                    numberFormat: [Object],
                    abi: [Object],
                    metadata: [Function: metadata],
                    network: [Function: network],
                    networks: [Function: networks],
                    address: [Object],
                    transactionHash: [Object],
                    links: [Function: links],
                    events: [Function: events],
                    binary: [Function: binary],
                    deployedBinary: [Function: deployedBinary],
                    unlinked_binary: [Object],
                    bytecode: [Object],
                    deployedBytecode: [Object],
                    sourceMap: [Object],
                    deployedSourceMap: [Object],
                    source: [Object],
                    sourcePath: [Object],
                    legacyAST: [Object],
                    ast: [Object],
                    compiler: [Object],
                    schema_version: [Function: schema_version],
                    schemaVersion: [Function: schemaVersion],
                    updated_at: [Function: updated_at],
                    updatedAt: [Function: updatedAt],
                    userdoc: [Function: userdoc],
                    devdoc: [Function: devdoc]
                },
                _property_values: {},
                _json: {
                    contractName: 'EthSwap',
                    abi: [Array],
                    metadata: '{"compiler":{"version":"0.5.16+commit.9c3226ce"},"language":"Solidity","output":{"abi":[{"inputs":[{"internalType":"contract Token","name":"_token","type":"address"},{"internalType":"contract Token2","name":"_token2","type":"address"},{"internalType":"contract Token3","name":"_token3","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"address","name":"token1","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rate","type":"uint256"}],"name":"TokensSold","type":"event"},{"constant":false,"inputs":[],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"helloWorld","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"sellTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"contract Token","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token2","outputs":[{"internalType":"contract Token2","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token3","outputs":[{"internalType":"contract Token3","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}],"devdoc":{"methods":{}},"userdoc":{"methods":{}}},"settings":{"compilationTarget":{"/home/ed/Downloads/EXCHANGE/ucan_exchange-master/src/contracts/EthSwap.sol":"EthSwap"},"evmVersion":"petersburg","libraries":{},"optimizer":{"enabled":false,"runs":200},"remappings":[]},"sources":{"/home/ed/Downloads/EXCHANGE/ucan_exchange-master/src/contracts/EthSwap.sol":{"keccak256":"0xf1b976bff13dd0f81b9738994913a3e6005e80de1ef04a49b2f38b48f3921f30","urls":["bzz-raw://85421bd08623f5fae3b92b97ef1ebb99b9e682f484bee53db34f2a4ab506c17b","dweb:/ipfs/QmRkLDjsh3efintra1H1o9hFi2Zpk77xLN7s11KUvwrLzK"]},"/home/ed/Downloads/EXCHANGE/ucan_exchange-master/src/contracts/Token.sol":{"keccak256":"0x0d89b76d0b5096a83087b68f14ce62d44d657d6b6fdf385423342dd2f8389ef0","urls":["bzz-raw://b728b2488bc387e9b6abf88f898d2ea80d00f800b7a998aca13a8c989379a8f7","dweb:/ipfs/QmP2nvF6sHNwFNrwbHZSUbn3tYAJN8TwiLhJRWwNFs3vqs"]},"/home/ed/Downloads/EXCHANGE/ucan_exchange-master/src/contracts/Token2.sol":{"keccak256":"0x3d9e353992e0fb89da42951f44ab4d24698217e2b73fae2c8770994f540e07c4","urls":["bzz-raw://553490e83cf247be64c6cb766dd99abeb1f8e9c324897045a27ecd52ac40e7e4","dweb:/ipfs/QmSmBQvhrNd4XpDpyoZ6kvkzV1eYasfuELRZmwpF8iMVWf"]},"/home/ed/Downloads/EXCHANGE/ucan_exchange-master/src/contracts/Token3.sol":{"keccak256":"0x003cb1503b4b22538b792ee5fa86b2693375f8fd867fefe9b84d86cef1e1d623","urls":["bzz-raw://3abf3c3593e863d344c7431990db496ab8727faa9351fb9b8e38d7ee1275e280","dweb:/ipfs/Qma9P6D8sUQ3FxFAhNSkr7nrEjTcWjPT5jjgXCmVMfvxjh"]}},"version":1}',
                    bytecode: '0x60806040526040518060400160405280601881526020017f4574685377617020496e7374616e742045786368616e676500000000000000008152506000908051906020019061004f929190610174565b50606460045534801561006157600080fd5b506040516106bd3803806106bd8339818101604052606081101561008457600080fd5b8101908080519060200190929190805190602001909291908051906020019092919050505082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050610219565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101b557805160ff19168380011785556101e3565b828001600101855582156101e3579182015b828111156101e25782518255916020019190600101906101c7565b5b5090506101f091906101f4565b5090565b61021691905b808211156102125760008160009055506001016101fa565b5090565b90565b610495806102286000396000f3fe60806040526004361061007b5760003560e01c8063c605f76c1161004e578063c605f76c146101c0578063d0febe4c14610250578063d21220a71461025a578063ef14101e146102b15761007b565b806306fdde031461008057806325be124e146101105780632c4e722e146101675780636c11bcd314610192575b600080fd5b34801561008c57600080fd5b50610095610308565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100d55780820151818401526020810190506100ba565b50505050905090810190601f1680156101025780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561011c57600080fd5b506101256103a6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561017357600080fd5b5061017c6103cc565b6040518082815260200191505060405180910390f35b6101be600480360360208110156101a857600080fd5b81019080803590602001909291905050506103d2565b005b3480156101cc57600080fd5b506101d56103d5565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102155780820151818401526020810190506101fa565b50505050905090810190601f1680156102425780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610258610412565b005b34801561026657600080fd5b5061026f610414565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102bd57600080fd5b506102c661043a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561039e5780601f106103735761010080835404028352916020019161039e565b820191906000526020600020905b81548152906001019060200180831161038157829003601f168201915b505050505081565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045481565b50565b60606040518060400160405280600981526020017f4f6c61206d756e646f0000000000000000000000000000000000000000000000815250905090565b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156fea265627a7a723158204bab2466291c6d1824b8d29b30b90a2f382bd06a3f41bd076184bf88e4888e7464736f6c63430005100032',
                    deployedBytecode: '0x60806040526004361061007b5760003560e01c8063c605f76c1161004e578063c605f76c146101c0578063d0febe4c14610250578063d21220a71461025a578063ef14101e146102b15761007b565b806306fdde031461008057806325be124e146101105780632c4e722e146101675780636c11bcd314610192575b600080fd5b34801561008c57600080fd5b50610095610308565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100d55780820151818401526020810190506100ba565b50505050905090810190601f1680156101025780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561011c57600080fd5b506101256103a6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561017357600080fd5b5061017c6103cc565b6040518082815260200191505060405180910390f35b6101be600480360360208110156101a857600080fd5b81019080803590602001909291905050506103d2565b005b3480156101cc57600080fd5b506101d56103d5565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102155780820151818401526020810190506101fa565b50505050905090810190601f1680156102425780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610258610412565b005b34801561026657600080fd5b5061026f610414565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102bd57600080fd5b506102c661043a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561039e5780601f106103735761010080835404028352916020019161039e565b820191906000526020600020905b81548152906001019060200180831161038157829003601f168201915b505050505081565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60045481565b50565b60606040518060400160405280600981526020017f4f6c61206d756e646f0000000000000000000000000000000000000000000000815250905090565b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156fea265627a7a723158204bab2466291c6d1824b8d29b30b90a2f382bd06a3f41bd076184bf88e4888e7464736f6c63430005100032',
                    immutableReferences: undefined,
                    generatedSources: undefined,
                    deployedGeneratedSources: undefined,
                    sourceMap: '140:798:0:-;;;165:47;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;314:3;295:22;;565:153;8:9:-1;5:2;;;30:1;27;20:12;5:2;565:153:0;;;;;;;;;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;565:153:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;653:6;644;;:15;;;;;;;;;;;;;;;;;;678:7;669:6;;:16;;;;;;;;;;;;;;;;;;704:7;695:6;;:16;;;;;;;;;;;;;;;;;;565:153;;;140:798;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;',
                    deployedSourceMap: '140:798:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;165:47;;8:9:-1;5:2;;;30:1;27;20:12;5:2;165:47:0;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;165:47:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;243:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;243:20:0;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;295:22;;8:9:-1;5:2;;;30:1;27;20:12;5:2;295:22:0;;;:::i;:::-;;;;;;;;;;;;;;;;;;;777:60;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;777:60:0;;;;;;;;;;;;;;;;;:::i;:::-;;843:93;;8:9:-1;5:2;;;30:1;27;20:12;5:2;843:93:0;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;843:93:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;724:47;;;:::i;:::-;;218:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;218:19:0;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;269:20;;8:9:-1;5:2;;;30:1;27;20:12;5:2;269:20:0;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;165:47;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;243:20::-;;;;;;;;;;;;;:::o;295:22::-;;;;:::o;777:60::-;;:::o;843:93::-;885:13;910:18;;;;;;;;;;;;;;;;;;;843:93;:::o;724:47::-;:::o;218:19::-;;;;;;;;;;;;;:::o;269:20::-;;;;;;;;;;;;;:::o',
                    source: '//SPDX-License-Identifier: GPL-3.0\n' +
                        'pragma solidity >=0.4.16 <0.9.0;\n' +
                        '\n' +
                        'import "./Token.sol";\n' +
                        'import "./Token2.sol";\n' +
                        'import "./Token3.sol";\n' +
                        '\n' +
                        '\n' +
                        '\n' +
                        'contract EthSwap\n' +
                        '{\n' +
                        '\n' +
                        '\n' +
                        '    string public name = "EthSwap Instant Exchange";\n' +
                        '    Token public token1;\n' +
                        '    Token2 public token2;\n' +
                        '    Token3 public token3;\n' +
                        '    uint public rate = 100;\n' +
                        '\n' +
                        '    event TokensPurchased(\n' +
                        '        address account,\n' +
                        '        address token1,\n' +
                        '        uint amount,\n' +
                        '        uint rate\n' +
                        '    );\n' +
                        '\n' +
                        '    event TokensSold(\n' +
                        '        address account,\n' +
                        '        address token1,\n' +
                        '        uint amount,\n' +
                        '        uint rate\n' +
                        '    );\n' +
                        '\n' +
                        '    constructor(Token _token, Token2 _token2, Token3 _token3) public\n' +
                        '    {\n' +
                        '        token1 = _token;\n' +
                        '        token2 = _token2;\n' +
                        '        token3 = _token3;\n' +
                        '    }\n' +
                        '\n' +
                        '    function buyTokens() public payable\n' +
                        '    {\n' +
                        '    }\n' +
                        '\n' +
                        '    function sellTokens(uint _amount) public payable\n' +
                        '    {\n' +
                        '    }\n' +
                        '\n' +
                        '    function helloWorld() public view returns(string memory) {\n' +
                        '        return "Ola mundo"; \n' +
                        '    }\n' +
                        '}',
                    sourcePath: '/home/ed/Downloads/EXCHANGE/ucan_exchange-master/src/contracts/EthSwap.sol',
                    ast: [Object],
                    legacyAST: [Object],
                    compiler: [Object],
                    networks: [Object],
                    schemaVersion: '3.4.1',
                    updatedAt: '2021-06-22T22:55:21.198Z',
                    networkType: 'ethereum',
                    devdoc: [Object],
                    userdoc: [Object],
                    db: undefined
                },
                setProvider: [Function: bound setProvider],
                new: [Function: bound new] {
                estimateGas: [Function: bound estimateDeployment]
            },
            at: [Function: bound at] AsyncFunction,
            deployed: [Function: bound deployed] AsyncFunction,
            defaults: [Function: bound defaults],
            hasNetwork: [Function: bound hasNetwork],
            isDeployed: [Function: bound isDeployed],
            detectNetwork: [Function: bound detectNetwork] AsyncFunction,
            setNetwork: [Function: bound setNetwork],
            setNetworkType: [Function: bound setNetworkType],
            setWallet: [Function: bound setWallet],
            resetAddress: [Function: bound resetAddress],
            link: [Function: bound link],
            clone: [Function: bound clone],
            addProp: [Function: bound addProp],
            toJSON: [Function: bound toJSON],
            decodeLogs: [Function: bound decodeLogs],
            web3: Web3Shim {
                currentProvider: [Getter / Setter],
                _requestManager: [RequestManager],
                givenProvider: null,
                providers: [Object],
                _provider: [HttpProvider],
                setProvider: [Function(anonymous)],
                BatchRequest: [Function: bound Batch],
                extend: [Function],
                version: '1.2.1',
                utils: [Object],
                eth: [Eth],
                shh: [Shh],
                bzz: [Bzz],
                networkType: 'ethereum'
            },
            class_defaults: {},
            currentProvider: HttpProvider {
                withCredentials: false,
                timeout: 0,
                headers: undefined,
                agent: undefined,
                connected: true,
                host: 'http://127.0.0.1:7545',
                httpAgent: [Agent]
            },
            network_id: '5777'
    },
methods: {
    'name()': [Function(anonymous)] {
        call: [Function(anonymous)],
            sendTransaction: [Function(anonymous)],
                estimateGas: [Function(anonymous)],
                    request: [Function(anonymous)]
    },
    'rate()': [Function(anonymous)] {
        call: [Function(anonymous)],
            sendTransaction: [Function(anonymous)],
                estimateGas: [Function(anonymous)],
                    request: [Function(anonymous)]
    },
    'token1()': [Function(anonymous)] {
        call: [Function(anonymous)],
            sendTransaction: [Function(anonymous)],
                estimateGas: [Function(anonymous)],
                    request: [Function(anonymous)]
    },
    'token2()': [Function(anonymous)] {
        call: [Function(anonymous)],
            sendTransaction: [Function(anonymous)],
                estimateGas: [Function(anonymous)],
                    request: [Function(anonymous)]
    },
    'token3()': [Function(anonymous)] {
        call: [Function(anonymous)],
            sendTransaction: [Function(anonymous)],
                estimateGas: [Function(anonymous)],
                    request: [Function(anonymous)]
    },
    'buyTokens()': [Function(anonymous)] {
        call: [Function(anonymous)],
            sendTransaction: [Function(anonymous)],
                estimateGas: [Function(anonymous)],
                    request: [Function(anonymous)]
    },
    'sellTokens(uint256)': [Function(anonymous)] {
        call: [Function(anonymous)],
            sendTransaction: [Function(anonymous)],
                estimateGas: [Function(anonymous)],
                    request: [Function(anonymous)]
    },
    'helloWorld()': [Function(anonymous)] {
        call: [Function(anonymous)],
            sendTransaction: [Function(anonymous)],
                estimateGas: [Function(anonymous)],
                    request: [Function(anonymous)]
    }
},
abi: [
    {
        inputs: [Array],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
        constant: undefined
    },
    {
        anonymous: false,
        inputs: [Array],
        name: 'TokensPurchased',
        type: 'event',
        constant: undefined,
        payable: undefined,
        signature: '0x6faf93231a456e552dbc9961f58d9713ee4f2e69d15f1975b050ef0911053a7b'
    },
    {
        anonymous: false,
        inputs: [Array],
        name: 'TokensSold',
        type: 'event',
        constant: undefined,
        payable: undefined,
        signature: '0x697c42d55a5e1fed3f464ec6f38b32546a0bd368dc8068b065c67566d73f3290'
    },
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [Array],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x06fdde03'
    },
    {
        constant: true,
        inputs: [],
        name: 'rate',
        outputs: [Array],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x2c4e722e'
    },
    {
        constant: true,
        inputs: [],
        name: 'token1',
        outputs: [Array],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xd21220a7'
    },
    {
        constant: true,
        inputs: [],
        name: 'token2',
        outputs: [Array],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0x25be124e'
    },
    {
        constant: true,
        inputs: [],
        name: 'token3',
        outputs: [Array],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xef14101e'
    },
    {
        constant: false,
        inputs: [],
        name: 'buyTokens',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
        signature: '0xd0febe4c'
    },
    {
        constant: false,
        inputs: [Array],
        name: 'sellTokens',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
        signature: '0x6c11bcd3'
    },
    {
        constant: true,
        inputs: [],
        name: 'helloWorld',
        outputs: [Array],
        payable: false,
        stateMutability: 'view',
        type: 'function',
        signature: '0xc605f76c'
    }
],
    address: '0x21052865ad9B5641893dD3133802962C2E7421C8',
        transactionHash: undefined,
            contract: Contract {
    currentProvider: [Getter / Setter],
        _requestManager: RequestManager {
        provider: [HttpProvider],
            providers: [Object],
                subscriptions: { }
    },
    givenProvider: null,
        providers: {
        WebsocketProvider: [Function: WebsocketProvider],
            HttpProvider: [Function: HttpProvider],
                IpcProvider: [Function: IpcProvider]
    },
    _provider: HttpProvider {
        withCredentials: false,
            timeout: 0,
                headers: undefined,
                    agent: undefined,
                        connected: true,
                            host: 'http://127.0.0.1:7545',
                                httpAgent: [Agent]
    },
    setProvider: [Function(anonymous)],
        BatchRequest: [Function: bound Batch],
            extend: [Function: ex] {
        formatters: [Object],
            utils: [Object],
                Method: [Function: Method]
    },
    clearSubscriptions: [Function(anonymous)],
        options: { address: [Getter / Setter], jsonInterface: [Getter / Setter] },
    defaultAccount: [Getter / Setter],
        defaultBlock: [Getter / Setter],
            methods: {
        name: [Function: bound _createTxObject],
            '0x06fdde03': [Function: bound _createTxObject],
                'name()': [Function: bound _createTxObject],
                    rate: [Function: bound _createTxObject],
                        '0x2c4e722e': [Function: bound _createTxObject],
                            'rate()': [Function: bound _createTxObject],
                                token1: [Function: bound _createTxObject],
                                    '0xd21220a7': [Function: bound _createTxObject],
                                        'token1()': [Function: bound _createTxObject],
                                            token2: [Function: bound _createTxObject],
                                                '0x25be124e': [Function: bound _createTxObject],
                                                    'token2()': [Function: bound _createTxObject],
                                                        token3: [Function: bound _createTxObject],
                                                            '0xef14101e': [Function: bound _createTxObject],
                                                                'token3()': [Function: bound _createTxObject],
                                                                    buyTokens: [Function: bound _createTxObject],
                                                                        '0xd0febe4c': [Function: bound _createTxObject],
                                                                            'buyTokens()': [Function: bound _createTxObject],
                                                                                sellTokens: [Function: bound _createTxObject],
                                                                                    '0x6c11bcd3': [Function: bound _createTxObject],
                                                                                        'sellTokens(uint256)': [Function: bound _createTxObject],
                                                                                            helloWorld: [Function: bound _createTxObject],
                                                                                                '0xc605f76c': [Function: bound _createTxObject],
                                                                                                    'helloWorld()': [Function: bound _createTxObject]
    },
    events: {
        TokensPurchased: [Function: bound],
            '0x6faf93231a456e552dbc9961f58d9713ee4f2e69d15f1975b050ef0911053a7b': [Function: bound],
                'TokensPurchased(address,address,uint256,uint256)': [Function: bound],
                    TokensSold: [Function: bound],
                        '0x697c42d55a5e1fed3f464ec6f38b32546a0bd368dc8068b065c67566d73f3290': [Function: bound],
                            'TokensSold(address,address,uint256,uint256)': [Function: bound],
                                allEvents: [Function: bound]
    },
    _address: '0x21052865ad9B5641893dD3133802962C2E7421C8',
        _jsonInterface: [
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object]
        ]
},
TokensPurchased: [Function(anonymous)],
    TokensSold: [Function(anonymous)],
        name: [Function(anonymous)] {
    call: [Function(anonymous)],
        sendTransaction: [Function(anonymous)],
            estimateGas: [Function(anonymous)],
                request: [Function(anonymous)]
},
rate: [Function(anonymous)] {
    call: [Function(anonymous)],
        sendTransaction: [Function(anonymous)],
            estimateGas: [Function(anonymous)],
                request: [Function(anonymous)]
},
token1: [Function(anonymous)] {
    call: [Function(anonymous)],
        sendTransaction: [Function(anonymous)],
            estimateGas: [Function(anonymous)],
                request: [Function(anonymous)]
},
token2: [Function(anonymous)] {
    call: [Function(anonymous)],
        sendTransaction: [Function(anonymous)],
            estimateGas: [Function(anonymous)],
                request: [Function(anonymous)]
},
token3: [Function(anonymous)] {
    call: [Function(anonymous)],
        sendTransaction: [Function(anonymous)],
            estimateGas: [Function(anonymous)],
                request: [Function(anonymous)]
},
buyTokens: [Function(anonymous)] {
    call: [Function(anonymous)],
        sendTransaction: [Function(anonymous)],
            estimateGas: [Function(anonymous)],
                request: [Function(anonymous)]
},
sellTokens: [Function(anonymous)] {
    call: [Function(anonymous)],
        sendTransaction: [Function(anonymous)],
            estimateGas: [Function(anonymous)],
                request: [Function(anonymous)]
},
helloWorld: [Function(anonymous)] {
    call: [Function(anonymous)],
        sendTransaction: [Function(anonymous)],
            estimateGas: [Function(anonymous)],
                request: [Function(anonymous)]
},
sendTransaction: [Function(anonymous)],
    send: [Function(anonymous)],
        allEvents: [Function(anonymous)],
            getPastEvents: [Function(anonymous)]
  }