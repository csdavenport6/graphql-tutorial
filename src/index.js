const { GraphQLServer } = require('graphql-yoga')

// 1
// This defines the GraphQL schema. Here, we define a simple query type with one 
// field called info, of type string! (the bang indicates that the field should not be null)
const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`

// Duummy data
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Full stack tutorial for GraphQL'
},{
    id: 'link-1',
    url: 'connor.com',
    description: 'test'
}]

// 2
// The revolvers object is the actual inplementation of the GraphQL schema. Its structure 
// is identical to the structure of the type defined in the typeDefs 
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews clone`,
        feed: () => links,
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

// 3
// The schema and resolvers are bundled and passed to the GraphQServer, which is imported from graphql-yoga. 
// This tells the server what API operations are accepted and how they should be resolved. 
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))