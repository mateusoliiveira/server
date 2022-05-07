import { NextFunction, Request, Response } from "express"
import JWT from "jsonwebtoken"
import { ForbiddenError } from "../errors/forbidden.error"

const JWTAuthGuard = async (
  request: Request & any,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = request.headers.authorization

    if (!authorizationHeader) {
      throw new ForbiddenError({ log: "Credenciais not found" })
    }

    const [authorizationType, jwtToken] = authorizationHeader.split(" ")

    if (authorizationType !== "Bearer") {
      throw new ForbiddenError({ log: "Invalid authorization type" })
    }

    if (!jwtToken) {
      throw new ForbiddenError({ log: "Invalid token" })
    }

    try {
      const tokenPayload = JWT.verify(jwtToken, "secretsecret")
      if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
        throw new ForbiddenError({
          log: "Invalid token, the format is invalid",
        })
      }
      request.user = tokenPayload.user
      return next()
    } catch (error) {
      throw new ForbiddenError({
        log: "Invalid token, please try log in again",
      })
    }
  } catch (error) {
    return next(error)
  }
}

export default JWTAuthGuard
