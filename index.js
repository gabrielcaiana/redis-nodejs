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
