const express = require("express");
const app = express();
const PORT = 5000;
const userData = require("./data/MOCK_DATA.json");
const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLInt
    },
    first_name: {
      type: GraphQLString
    },
    last_name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    gender: {
      type: GraphQLString
    },
    ip_address: {
      type: GraphQLString
    },
    passowrd: {
      type: GraphQLString
    },
    salary: {
      type: GraphQLString
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => {
        return userData;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        first_name: {
          type: GraphQLString
        },
        last_name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        gender: {
          type: GraphQLString
        },
        ip_address: {
          type: GraphQLString
        },
        passowrd: {
          type: GraphQLString
        },
        salary: {
          type: GraphQLString
        }
      },
      resolve: (parent, args) => {
        userData.push({
          id: userData.length + 1,
          email: args.email,
          first_name: args.first_name,
          gender: args.gender,
          ip_address: args.ip_address,
          last_name: args.last_name,
          passowrd: args.passowrd,
          salary: args.salary
        });
        return args;
      }
    }
  }
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
