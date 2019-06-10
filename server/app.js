const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect('mongodb://127.0.0.1:27017/events-react-dev', {
    useNewUrlParser: true
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('SERVER STARTED');
    });
  })
  .catch(err => console.log(err));
