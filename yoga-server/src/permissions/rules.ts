import { rule, and, or, not } from 'graphql-shield'
import { Context, getAuthToken, getUserId } from './my-utils'
// import { }

export const isLoggedIn = rule()(async (parent, args, ctx: Context, info) => {
  const userId = getUserId(ctx)
  console.log('USERID:', userId)
  // Is there a Grocer with such email in our database (Prisma)?
  return ctx.db.exists.User({ id: userId })
})

// export const isCustomer = rule()(
//   async (parent, args, ctx: Context, info) => {
//     const userId = getUserId(ctx)
//     // Is there a Customer with such email in our database (Prisma)?
//     return ctx.db.exists.Customer({ id: userId })
//   },
// )

export const isAuthenticated = or(isLoggedIn)