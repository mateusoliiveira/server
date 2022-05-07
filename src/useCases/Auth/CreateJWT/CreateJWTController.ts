import { NextFunction, Request, Response } from "express"
import { CreateJWTUseCase } from "./CreateJWTUseCase"
import { ICreateJWTRequestDTO } from "./CreateJWTDTO"
import { ForbiddenError } from "../../../errors/forbidden.error"
import { BadRequestError } from "../../../errors/bad-request.error"
import { GetUserByUsernameAndPassUseCase } from "../../User/GetUserByUsernameAndPassword/GetUserByUsernameAndPassUseCase"

export class CreateJWTController {
  constructor(
    private getUserByUsernameAndPassUseCase: GetUserByUsernameAndPassUseCase,
    private createJWTUseCase: CreateJWTUseCase,
  ) { }

  async handle(request: Request & ICreateJWTRequestDTO, response: Response, next: NextFunction): Promise<Response> {


    const authorizationHeader = request.headers.authorization

    if (!authorizationHeader) {
      throw new ForbiddenError({ log: "Credenciais not found" })
    }

    const [authorizationType, base64Token] = authorizationHeader.split(" ")

    if (authorizationType !== "Basic") {
      throw new ForbiddenError({ log: "Invalid authorization type" })
    }

    const [username, password] = Buffer.from(base64Token, "base64")
      .toString("utf-8")
      .split(":")

    if (!username || !password) {
      throw new BadRequestError({ log: "Credenciais not found" })
    }

    let user: any

    try {
      user = await this.getUserByUsernameAndPassUseCase.execute({
        username, password
      })
    } catch (error) {
      next(error)
    }

    try {
      const { password, ...safeUserData } = user
      const token = await this.createJWTUseCase.execute(
        { user: { ...safeUserData } }
      )
      return response.status(200).json({ token, ...safeUserData })
    } catch (error) {
      next(error)
    }
  }
}