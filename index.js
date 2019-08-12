const express = require('express');
const graphqlHttp = require('express-graphql');
const graphql = require('graphql');
const mongoose = require('mongoose');
const User = require('./models/user');
const graphqlconfig = require('./graphqlconfig');

const app = express();
app.use(express.json());

var graphqlSchema = new graphql.GraphQLSchema(
  {
    query: graphqlconfig.query,
    mutation: graphqlconfig.mutation
  }
);

app.use('/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    graphiql: true
  })
);

//console.log(`${process.env.MONGO_DB}`);
//DEBUG MONGOOSE QUERIES
mongoose.set('debug', true);
const banco = 'marcar-futebol-dev';
mongoose.connect(
  `mongodb://localhost:27017/${banco}`, { useNewUrlParser: true, useCreateIndex: true }
).then(() => {
  console.log(`MongoDB banco *${banco}* OK!`);
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});
