function link(parent, args, context) {
    return context.prisma.votes({ id: parent.id }).link()
}

function user(parent, args, context) {
    return context.prisma.votes({ id: parentId }).user()
}

module.exports = {
    link, 
    user,
}