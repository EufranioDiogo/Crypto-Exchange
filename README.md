Conselhos:
    - Usar Linux de preferência Ubuntu

Dependências do projecto:
    - MongoDB
    - Ganache
    - Truffle
    - Postman
    - MongoCompass
    - VsCode
    - Sorriso no Rosto


1º Fazer o download do repo, usando o git

`git clone https://www.github.com/EufranioDiogo/Crypto-Exchange.git`

2º Entrar na pasta criada

`cd Crypto-Exchange`

3º Instalar todas dependências usando o npm

`npm install`

4º Dar inicio ao ganache vai depender da sua maquina esse caso

5º Inicializar o mongod(servidor do mongoDB)

`sudo systemctl start mongod`

6º Entrar na pasta do projecto e rodar as migrassões do truffle

`truffle migrate --reset`

7º Alterar algumas linhas no código

