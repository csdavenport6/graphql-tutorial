const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require = require('./resolvers/Vote')

const resolvers = {
    Query, 
    Mutation,
    Subscription,
    Vote,
    User,
    Link,
}

// 3
// The schema (defined in schema.graphql file) and resolvers are bundled and passed to the GraphQServer, which is imported from graphql-yoga. 
// This tells the server what API operations are accepted and how they should be resolved. 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request, 
            prisma,
        }
    },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))