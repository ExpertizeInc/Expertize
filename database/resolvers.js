const { find, filter } = require('lodash');


// test data
const users = [
  {id: 1, username: 'userbob', email: 'emailbob'},
  {id: 2, username: 'usersue', email: 'emailsue'}
]

const tags = [
  {id: 1, name: 'art'},
  {id: 2, name: 'python'},
  {id: 3, name: 'cooking'}
]

const userTags = [
  {id: 1, userId: 1, tagId: 1},
  {id: 2, userId: 1, tagId: 2},
  {id: 3, userId: 2, tagId: 3},
  {id: 4, userId: 2, tagId: 1}
]

// will replace with db model
const resolvers = {
  Query: {
    user: (_, { id }) => find(users, { id }),
    tags: () => tags
  },

  User: {
    tags: user => filter(userTags, { userId: user.id }),
  },
  
  UserTag: {
    user: user => find(users, { id: user.id }),
    tag: tag => find(tags, { id: tag.id})
  }
}

module.exports = resolvers