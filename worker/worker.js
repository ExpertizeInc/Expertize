const { GraphQLClient } = require('graphql-request');
const dotenv = require('dotenv').config();
 
const RESET_DAILIES = `
mutation updateManyUsers($dailyClaimed: Boolean) {
  updateManyUsers(dailyClaimed: $dailyClaimed) {
    count
  }
}
`

const EXPIRE_MESSAGES = `
mutation updateManyMessages {
  updateManyMessages {
    count
  }
}
`
const endpoint = 'http://localhost:4000/'
 
const client = new GraphQLClient(endpoint, { headers: process.env.AUTHORIZATION })

setInterval(() => {
  if (new Date().getHours() >= 1) {
    client.request(RESET_DAILIES, { dailyClaimed: false })
    .then(data => console.log('reset dailies at:', new Date().toLocaleString(), data))
    .catch(err => console.log('err', err))
  }
}, 3000000)

setInterval(() => {
    client.request(EXPIRE_MESSAGES)
    .then(data => console.log('expired messages', new Date().toLocaleString(), data))
    .catch(err => console.log('err', err))
}, 40000)

