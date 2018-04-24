const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const axios = require("axios");

let users = require(`${__dirname}/model`);

const BASE_URL = "http://www.swapi.co";

function getFilms(url) {
  return axios.get(url).then(response => response.data);
}

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields() {
    return {
      id: {
        type: GraphQLNonNull(GraphQLInt),
        resolve(person) {
          return person.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve(person) {
          return person.name;
        }
      },
      height: {
        type: GraphQLInt,
        resolve(person) {
          return person.height;
        }
      },
      films: {
        type: new GraphQLList(MovieType),
        resolve(person) {
          return person.films[0] ? person.films.map(getFilms) : [];
        }
      }
    };
  }
});

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields() {
    return {
      title: {
        type: GraphQLString,
        resolve(movie) {
          return movie.title;
        }
      },
      releaseDate: {
        type: GraphQLString,
        resolve(movie) {
          return movie.release_date;
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields() {
    return {
      people: {
        type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(PersonType))),
        resolve(root, args) {
          return users;
        }
      }
    };
  }
});

module.exports = new GraphQLSchema({
  query: Query
});
