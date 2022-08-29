# Como implementar o Redis como cache no Node.js

## Introdução

De acordo com o próprio Redis, o Redis é um armazenamento de estrutura de dados na memória de código aberto (licenciado pelo BSD) usado como banco de dados, cache, agente de mensagens e mecanismo de streaming. O Redis fornece estruturas de dados como De acordo com o próprio Redis, o Redis é um armazenamento de estrutura de dados na memória de código aberto (licenciado BSD) usado como banco de dados, cache, agente de mensagens e mecanismo de streaming. O Redis fornece estruturas de dados como strings , hashes , listas , conjuntos , conjuntos classificados com consultas de intervalo, bitmaps , hiperloglogs , índices geoespaciais e fluxos .

## Redis como cache

O Redis é um armazenamento de dados de chave-valor rápido, de código aberto, na memória. A seguir estão as listas de benefícios recebidos usando o Redis para armazenamento em cache.

### Alta disponibilidade de dados

- Escala vertical
- Replicação e persistência
- Simplicidade e facilidade de uso
- atuação
- Casos de uso do Redis
- Para citar alguns, estes são os casos de uso do Redis, mas não estão limitados a:

### Gerenciamento de sessão

- Cache
- Análise em tempo real
- Streaming de mídia avançada
- Geoespacial
- Aprendizado de máquina
- e muitos mais..

### Cache usando Redis

Inicializando o aplicativo Redis

```shell
## scaffolding a express application
mkdir redis-cache-impl && cd redis-cache-impl

## initializing a node application and installing all the required dependencies
npm init -y
npm i express redis axios

## creating a starting point for the application
touch index.js

## open the project in your preferred code editor
code .
```

### Criando servidor de exemplo

```javascript
const express = require('express');
const redis = require('redis');
const axios = require('axios');

const app = express();
app.use(express.json());
const requestUrl = 'https://jsonplaceholder.typicode.com/posts';

//* configuring and creating redis client
const client = redis.createClient({
  host: '127.0.0.1', //* Redis Host URL
  port: 6379, //* Redis Host PORT number
  password: null, //* Host password null if empty
});

//* connecting to the redis data store
function redisConnection() {
  client.connect();
  console.log('Connection made with Redis');
}

app.get('/', async (req, res) => {
  //* mapping redis key according to request url
  const key = req.url;

  //* getting data from the cache if cache is present for the given key
  const cachedData = await client.get(key);
  if (cachedData) {
    console.log('!!! Cache Hit !!!');
    //* parsing data as data is saved in string format in redis
    return res.status(200).json(JSON.parse(cachedData));
  }

  //* fetching data from the requestUrl
  axios
    .get(requestUrl)
    .then((data) => {
      console.log('cache miss');
      //* putting data in cache in string format
      client.set(key, JSON.stringify(data.data));
      console.log('Putting data in cache ...');
      return res.status(200).json(data.data);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

//* starting the express server and making connection to Redis data store
app.listen(3000, () => {
  console.log('Server Started at port 3000');
  redisConnection();
});
```
