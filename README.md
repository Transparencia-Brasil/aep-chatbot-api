# aep-chatbot-api

## Como desenvolver

### Passo 1

Instale o [docker](https://docs.docker.com/install/) e o [docker-compose](https://docs.docker.com/compose/install/).

### Passo 2

Configure as variáveis de ambiente em um arquivo `.env`. Para isto faça uma cópia do arquivo `.env.sample` e a reinomeie para `.env`.
 
### Passo 3

Utilize o docker-compose para criar os containers da api (`aep-chatbot-api`) e banco de dados (`aep-chatbot-postgres`).

```
docker-compose build
```

A api deve ficar disponível em [http://localhost:3232/](http://localhost:3232/)

## Criar banco de dados

Um banco de dados é criado na criação do container `aep-chatbot-api`, com o nome definido nas variáveis de ambiente. Já as tabelas e relações do banco são criadas usando o [sequelize-cli](https://sequelize.org/master/manual/migrations.html), já instalado no container `aep-chatbot-api`. Para executar a migração (criação e atualização da estrutura do banco), entre no container:

```
docker exec -it aep-chatbot-api sh
```

e depois execute:

```
sequelize db:migrate
```

## Importar dados

Com o banco de dados criado, é preciso importar dados iniciais. Isso pode ser feito executando o comando abaixo dentro do container `edu-chatbot-postgres`:

```
docker exec -it edu-chatbot-postgres sh
```

e depois:

```
psql -h localhost -U aepchatbot -d aepchatbot -f app/seed/import-data.sql
```

NOTA: Dados de acesso ao banco usados no comando acima variam conforme as variáveis de ambiente definidas no `.env`.