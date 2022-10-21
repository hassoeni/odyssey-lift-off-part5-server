const { ApolloServer, gql } = require('apollo-server-cloud-functions');
const {
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');

// async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, 
    csrfPrevention: true, 
    cache: 'bounded', 
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true }),
],
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
  });

//   const { url, port } = await server.listen();
//   console.log(`
//       🚀  Server is running
//       🔉  Listening on port ${port}
//       📭  Query at ${url}
//     `);
// // }


exports.handler = server.createHandler(typeDefs, resolvers)
// startApolloServer(typeDefs, resolvers);
