const { GraphQLServer } = require('graphql-yoga')

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

let idCount = links.length
// 2
// The revolvers object is the actual inplementation of the GraphQL schema. Its structure 
// is identical to the structure of the type defined in the typeDefs 
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews clone`,
        feed: () => links,  
        link: (parent, args) => {
            var linkID = args.id
            return links.filter(link => {
                return link.id == linkID;
            })[0]
        }
        },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link

        }

    }
}

// 3
// The schema (defined in schema.graphql file) and resolvers are bundled and passed to the GraphQServer, which is imported from graphql-yoga. 
// This tells the server what API operations are accepted and how they should be resolved. 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))