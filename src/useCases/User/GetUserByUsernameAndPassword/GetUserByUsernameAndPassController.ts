import { NextFunction, Request, Response } from "express"
import { GetUserByUsernameAndPassUseCase } from "./GetUserByUsernameAndPassUseCase"


export class GetUserByUsernameAndPassController {
  constructor(
    private getUserByUsernameAndPassUseCase: GetUserByUsernameAndPassUseCase,
  ) { }

  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { username, password } = request.params
    try {
      let result: any = await this.getUserByUsernameAndPassUseCase.execute({
        username, password
      })
      return response.status(200).send(result)
    } catch (error) {
      next(error)
    }
  }
}