import * as jwt from "jsonwebtoken";
// import * as Errors from "./errors";
// import { Maybe, Context } from "./types";
import { Prisma } from "prisma-binding";

const APP_SECRET_ENV_NAME = "APP_SECRET";

export interface Context {
  db: Prisma,
  request: any
}

export function getUserIdFromRequest(request: any) {
  try {
    const Authorization = request.get("Authorization");
    if (Authorization) {
      const token = Authorization.replace("Bearer ", "");
      const { userId } = jwt.verify(
        token,
        process.env[APP_SECRET_ENV_NAME]
      ) as {
        userId: string;
      };
      return userId;
    }
  } catch (e) {
    /**
     * In production, this scenario can happen if the secret used to 
     * verify the token has changed... 
     */
    return null;
  }

}

export function getUserId(ctx: Context) {
  return getUserIdFromRequest(ctx.request);
}

export function getAuthToken(user: { id: string }) {
  return jwt.sign({ userId: user.id }, process.env[APP_SECRET_ENV_NAME]);
}