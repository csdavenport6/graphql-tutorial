const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    // first thing to do: encrypt the user's password
    const password = await bcrypt.hash(args.password, 10)
    // use the prisma client interface to store the new user
    const user = await context.prisma.createUser({...args, password})
    // generate JWT which is signed with an APP_SECRET, which we still need to create
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    // return object that adheres to the shape of the AuthPayLoad object
    return {
        token, 
        user,
    }
}

async function login(parent, args, context, info) {
    // user the prisma client interface to get the existing User record by the email that was sent as an argument
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error("Invalid Password")
    }
    // compre the provided password with the one in the database 
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error("Invalid password")
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
        token,
        user,
    }
}

function post(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
    })
}

async function vote(parent, args, context, info) {
    const userId = getUserId(context)
    const linkExists = await context.prisma.$exists.vote({
        user: { id: userId },
        link: { id: args.linkId }, 
    })
    if (linkExists) {
        throw new Error(`Already votes for link: ${args.linkId }`)
    }
    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
    })
}

module.exports = {
    signup,
    login,
    post,
    vote,
}