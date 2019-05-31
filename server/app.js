const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('HEY');
});

app.listen(3000, () => {
  console.log('SERVER STARTED');
});
