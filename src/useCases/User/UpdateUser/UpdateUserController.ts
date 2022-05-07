import { NextFunction, Request, Response } from "express"
import { UpdateUserUseCase } from "./UpdateUserUseCase"

export class UpdateUserController {
  constructor(
    private updateUserUseCase: UpdateUserUseCase,
  ) { }

  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { body } = request
    const { id } = request.user
    try {
      const result: any = await this.updateUserUseCase.execute(
        id, body
      )
      return response.status(200).send(result)
    } catch (error) {
      next(error)
    }
  }
}