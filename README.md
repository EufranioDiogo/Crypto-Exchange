
# Breve descrição do projecto

O projecto tem como objectivo a criação de uma exchange descentralizada, com o objectivo em que bots dos estudantes irão operar dentro do mercado e com o principal objectivo de fazer lucros para o seu proprietário que de certa forma esse lucro ira medir a transição do estudante ou não.

# Descrição Técnica

O projecto possui 3 crypto moedas que são:
    - UCANA
    - UCANE
    - UCANU

O projecto esta dividido em 3 partes essênciais, que são: Cliente(bot), Servidor(Contem API), Exchange(Smart Contracts).
E funcionando de maneira que o cliente coloca se comunica com o servidor via HTTP Requests(POST, GET) o servidor recebe tal request valida as credênciais enviadas, realiza as devidas operações com a Exchange e retorna o result da para operações em formato JSON.

O projecto possui uma caractéristica técnica de segurança no que são todas as operações, sendo que em cada operação realizada existe a necessidade da sua autenticação. Mas tendo em conta que para cada operação o seu nível de segurança pode variar, para que de certa forma não permita a burla do sistema por parte de alguns concorrentes.

## Conselhos:
    - Usar Linux de preferência Ubuntu
    - Construir o bot em nodejs
    - Utilize o pacote axios para fazer as requisições

## Dependências o funcionamento em máquina local:
    - MongoDB
    - Ganache
    - Truffle
    - Postman
    - MongoCompass
    - VsCode
    - Sorriso no Rosto

## Dependências para o dia do exame:
    - Estar a apontar todas as requests para o IP do servidor do dia e não o IP 127.0.0.1

## Passos a serem realizados para o exame:
    1º Recebimento dos seus dados dentro do sistema
    2º Conexão a rede local montada
    3º Inicializar as configurações para apontarem para o servidor com o endereço 192.168.0.1/24

## Passos para colocar o projecto rodando em sua máquina

1º Fazer o download do repo, usando o git

`git clone https://www.github.com/EufranioDiogo/Crypto-Exchange.git`

2º Entrar na pasta criada que se chamara Crypto-Exchange

`cd Crypto-Exchange`

3º Instalar todas dependências usando o npm

`npm install`

4º Dar inicio ao ganache

5º Criar uma base de dados mongodb chamada exchange_API

6º Inicializar o mongod(servidor do mongoDB)

`sudo systemctl start mongod`

7º Entrar na pasta do projecto e rodar as migrassões do truffle

`truffle migrate --reset`

8º Inicializar o servidor

`node server.js`

9º Acesseder as rotas para o uso da exchange


# Actualizar o Projecto por uma Versão mais Actual

1º Inicializar o servidor

`git add .`
`git commit -m "Changes done by me"`
`git pull origin main`

# Rotas disponiveis

## O que são?

Rotas são caminhos na maior parte publicos disponibilizados por APIs que quando solicitadas o Servidor que contem tál rota implementada realiza um conjunto de operações de acordo com a rota e as informações entregues por quem chamou a rota e retorna uma resposta para o cliente(individuo que chamou a rota) e esta resposta normalmente é no formato JSON e no caso da nossa API também é veridico.

## Estrutra das rotas

1º Definir o method que pode ser GET ou POST
2º Definir a rota que ira chamar

    `http:/IP:PORTA/<rota>`

## Rotas Disponiveis

Method: **POST** 
`http:/IP:PORTA/register` -> Rota usada para a criação de um usuário na exchange.

O body(Corpo) da requisição de ser da seguinte forma:

```
{
    "idEstudante": "100000",
    "nome": "Fulano",
    "sobrenome": "Ucan",
    "idConta": "0xSSMKSAmsjnsd2dmsdkdsjds",
    "privateKey": "dkksdmkdmdskmdkmdkdsm",
}
```

---

Method: **GET** 
`http:/IP:PORTA/balance/<idEstudante>` -> Rota usada para saber o seu saldo actual nas 3 moedas.

Elementos passados por parametro: *"idEstudante"*
Exemplo:

http://127.0.0.1/balance/10001919(nesse caso deve ter o id de estudante da  conta criada).

O body da requisição de ser da seguinte forma:

```
{
    "idConta": "0xSSMKSAmsjnsd2dmsdkdsjds",
    "privateKey": "dkksdmkdmdskmdkmdkdsm"
}
```

---

Method: **GET** 
`http:/IP:PORTA/exchange` -> Rota usada para ter informações sobre o preço e relações entre as moedas.

O body da requisição de ser da seguinte forma:

```
{
    "idEstudante": "10001919"
}
```

---

Method: **POST** 
`http:/IP:PORTA/placeOrder` -> Rota usada para colocar uma order (ordem na exchange), independentemente se for uma ordem de compra ou venda.

O body da requisição de ser da seguinte forma:

```
{
    "idEstudante": "112345678",
    "idConta": "0xdsjndsdjndsNJANA32",
    "privateKey": "21h328dsuh23jjhsjhd3232hjh23h32uhsuhu32hu3h2uh32uh23u",
    "targetTokenName": "UCANU",
    "offeredTokenName": "UCANA",
    "quantTokensOffered": "250",
    "quantTokensTarget": "400",
    "orderType": 1
}
```

## Explicação do body da requisação

- **idConta**: Será conhecido por owner porque foi este individuo com esta conta que colocou a order na Exchange

- **targetTokenName**: é o nome da moeda que tu tens como objectivo de adquirir

- **offeredTokenName**: Faz referência a moeda que vc está disposto a abdicar para pegar a tua targetTokenName

- **quantTokensOffered**: São a quantidade máxima de offeredTokenName que vc está disposto para abdicar em troca de um certo montante do targetTokenName.

- **quantTokensTarget**: Denota a quantidade de moedas que no minímino vc quer receber da targetTokenName em função da quantidade disponibilizada de offeredTokenName

- **orderType**: É o tipo de ordem que vc vai prentender fazer, ela varia de 0 a 1, sendo que 0 significa ordem de venda, significando que vc está vendendo algo em troca de algo, e 1 significa ordem de compra, anunciando que vc quer comprar algo em troca de um certo montenta máximo de offeredTokenName que vc está disponibilizando.

---

Method: **GET** 
`http:/IP:PORTA/getBuyOrders` -> Rota usada para mostrar todas as ordens de compra feitas na exchange.

Response Template:

```
{
    "status": 200,
    "message": "Buy orders Mappings",
    "buyOrders": [
        {
            "id": "0",
            "owner": "0xdsjndsdjndsNJANA32",
            "targetTokenName": "UCANU",
            "quantTokensTarget": "400",
            "offeredTokenName": "UCANA",
            "quantTokensOffered": "400",
            "isCompleted": true
        },
        {
            "id": "2",
            "owner": "0xdsjndsdjndsNJANA32",
            "targetTokenName": "UCANU",
            "quantTokensTarget": "400",
            "offeredTokenName": "UCANA",
            "quantTokensOffered": "400",
            "isCompleted": false
        }
    ]
}
```

---

Method: **GET** 
`http:/IP:PORTA/getSellOrders` -> Rota usada para mostrar todas as ordens de venda feitas na exchange.

Response Template:

```
{
    "status": 200,
    "message": "Sell orders Mappings",
    "sellOrders": [
        {
            "id": "1",
            "owner": "0xdsjndsdjndsNJANA32",
            "targetTokenName": "UCANA",
            "quantTokensTarget": "400",
            "offeredTokenName": "UCANU",
            "quantTokensOffered": "400",
            "isCompleted": true
        },
        {
            "id": "3",
            "owner": "0xdsjndsdjndsNJANA32",
            "targetTokenName": "UCANA",
            "quantTokensTarget": "400",
            "offeredTokenName": "UCANU",
            "quantTokensOffered": "400",
            "isCompleted": true
        }
    ]
}
```

---

Method: **GET** 
`http:/IP:PORTA/getBuyOrders/<idConta>` -> Rota usada para mostrar todas as TUAS ordens de compra feitas na exchange.


O body da requisição de ser da seguinte forma:

```
{
    "privateKey": "21h328dsuh23jjhsjhd3232hjh23h32uhsuhu32hu3h2uh32uh23u"
}
```

Response Template:

```
{
    "status": 200,
    "message": "My Buy orders Mappings",
    "buyOrders": [
        {
            "id": "0",
            "owner": "0xdsjndsdjndsNJANA32",
            "targetTokenName": "UCANU",
            "quantTokensTarget": "400",
            "offeredTokenName": "UCANA",
            "quantTokensOffered": "400",
            "isCompleted": true
        },
        {
            "id": "2",
            "owner": "0xdsjndsdjndsNJANA32",
            "targetTokenName": "UCANU",
            "quantTokensTarget": "400",
            "offeredTokenName": "UCANA",
            "quantTokensOffered": "400",
            "isCompleted": false
        }
    ]
}
```

---

Method: **GET** 
`http:/IP:PORTA/getSellOrders/<idConta>` -> Rota usada para mostrar todas as TUAS ordens de venda feitas na exchange.

O body da requisição de ser da seguinte forma:

```
{
    "privateKey": "21h328dsuh23jjhsjhd3232hjh23h32uhsuhu32hu3h2uh32uh23u"
}
```

Response Template:

```
{
    "status": 200,
    "message": "My Sell orders Mappings",
    "sellOrders": [
        {
            "id": "1",
            "owner": "0xdsjndsdjndsNJANA32",
            "targetTokenName": "UCANU",
            "quantTokensTarget": "400",
            "offeredTokenName": "UCANA",
            "quantTokensOffered": "400",
            "isCompleted": true
        }
    ]
}
```

---

Method: **GET** 
`http:/IP:PORTA/exchangeMarketMoviment` -> Rota usada para mostrar todo track das operações realizadas na exchange, actualização feita de 20 em 20 segundos, x é o momento ou o intervalo de tempo e y é o montante tranzacionado de determinada moeda naquele intervalo de tempo.

Response Template:

```
{
    "exchangeMarketMovement": [
        {
            "x": 20,
            "ucanaTransactedAmount": 0,
            "ucanuTransactedAmount": 0,
            "ucaneTransactedAmount": 0
        },
        {
            "x": 40,
            "ucanaTransactedAmount": 400,
            "ucanuTransactedAmount": 0,
            "ucaneTransactedAmount": 0
        },
    ]
}
```