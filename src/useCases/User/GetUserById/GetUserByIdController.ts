import { NextFunction, Request, Response } from "express"
import { GetUserByIdUseCase } from "./GetUserByIdUseCase"


export class GetUserByIdController {
  constructor(
    private getUserByIdUseCase: GetUserByIdUseCase,
  ) { }

  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params
    try {
      let result: any = await this.getUserByIdUseCase.execute({ id })
      return response.status(200).send(result)
    } catch (error) {
      next(error)
    }
  }
}