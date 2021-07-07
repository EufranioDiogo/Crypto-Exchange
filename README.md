# Breve descrição do projecto

O projecto tem como objectivo a criação de uma exchange descentralizada, com o objectivo em que bots dos estudantes irão operar dentro do mercado e com o principal objectivo de fazer lucros para o seu proprietário que de certa forma esse lucro ira medir a transição do estudante ou não.

# Descrição Técnica

O projecto possui 3 crypto moedas que são:
    - UCANA
    - UCANE
    - UCANU

O projecto opera na abordagem cliente servidor, usando uma API que por ela o cliente ira se comunicar com a blockchain, onde o cliente se comunica com a API e o servidor que roda esta API se comunica com a blockchain e a blockchain responde ao servidor e o servidor o cliente.

O projecto possui uma caractéristica técnica de segurança no que são todas as operações, sendo que em cada operação realizada existe a necessidade da sua autenticação. Mas tendo em conta que para cada operação o seu nível de segurança pode variar, para que de certa forma não permita a burla do sistema por parte de alguns concorrentes.

## Conselhos:
    - Usar Linux de preferência Ubuntu

## Dependências o funcionamento em máquina local:
    - MongoDB
    - Ganache
    - Truffle
    - Postman
    - MongoCompass
    - VsCode
    - Sorriso no Rosto

## Dependências para o dia do exame:
    - Nenhuma

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

# Rotas disponiveis

**POST** `/register` -> Rota usada para a criação de um usuário na exchange.

O body da requisição de ser da seguinte forma:

```
{
    "idEstudante": "100000",
    "nome": "Fulano",
    "sobrenome": "Ucan",
    "idConta": "0xSSMKSAmsjnsd2dmsdkdsjds",
    "privateKey": "dkksdmkdmdskmdkmdkdsm",
}
```

**GET** `/balance/:"idEstudante"` -> Rota usada para saber o seu saldo actual nas 3 moedas.

Elementos passados por parametro: *"idEstudante"*
Exemplo:

http://127.0.0.1/balance/100000 (nesse caso deve ter o id de estudante da  conta criada).

O body da requisição de ser da seguinte forma:

```
{
    "idConta": "0xSSMKSAmsjnsd2dmsdkdsjds",
    "privateKey": "dkksdmkdmdskmdkmdkdsm",
}
```

**GET** `/exchange` -> Rota usada para ter informações sobre o preço e relações entre as moedas.

O body da requisição de ser da seguinte forma:

```
{
    "idEstudante": "100000",
}
```

**POST** `/swap` -> Rota usada para fazer o swap entre as moedas.

O body da requisição de ser da seguinte forma:

```
{
    "idEstudante": "100000",
    "idConta": "0xSSMKSAmsjnsd2dmsdkdsjds",
    "privateKey": "dkksdmkdmdskmdkmdkdsm",
    "amount": "100",
    "origCrypto": "UCANA",
    "destCrypto": "UCANU"
}
```
