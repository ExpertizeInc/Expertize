// import extractUserIdFromContext from 'my-utils';

// const allowAnyone = () => true;
// const allowLoggedInUsers = (_, args, ctx) => {
//   const userId = extractUserIdFromContext(ctx);
//   const user = await ctx.prisma.query.user({ where: { id: userId }});
//   return user == null ? false : true;
// }


// const schemaPermissions = {
//   Query: {
//     signup: allowAnyone,
//     user: allowLoggedInUsers,
//   },
//   User: {
//     name: allowLoggedInUsers,
//     tags: allowLoggedInUsers
//   }
// }

import { shield, and } from 'graphql-shield'
import * as rules from './rules'

export const permissions = shield({
  Query: {
    user: rules.isAuthenticated
  },
  Mutation: {
    addUser: rules.isAuthenticated
  }
});
