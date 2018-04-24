const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");

const schema = require(`${__dirname}/graphql/schema`);

const port = 3001;

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.post(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: false
  })
);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
