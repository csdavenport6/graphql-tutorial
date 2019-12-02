const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// 2
// The revolvers object is the actual inplementation of the GraphQL schema. Its structure 
// is identical to the structure of the type defined in the typeDefs 
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        }, 
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            })
        },
    },
}

// 3
// The schema (defined in schema.graphql file) and resolvers are bundled and passed to the GraphQServer, which is imported from graphql-yoga. 
// This tells the server what API operations are accepted and how they should be resolved. 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))