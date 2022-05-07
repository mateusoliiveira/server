import { NextFunction, Request, Response } from "express"
import { GetUserByUsernameUseCase } from "./GetUserByUsernameUseCase"


export class GetUserByUsernameController {
  constructor(
    private getUserByUsernameUseCase: GetUserByUsernameUseCase,
  ) { }

  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { username } = request.params
    try {
      let result: any = await this.getUserByUsernameUseCase.execute({ username })
      return response.status(200).send(result)
    } catch (error) {
      next(error)
    }
  }
}