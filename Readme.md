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
