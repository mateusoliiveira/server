import { NextFunction, Request, Response } from "express"
import { DeleteUserUseCase } from "./DeleteUserUseCase"


export class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUserUseCase,
  ) { }

  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { id } = request.params
    try {
      const result: any = await this.deleteUserUseCase.execute({ id })
      return response.sendStatus(200).send(result)
    } catch (error) {
      next(error)
    }
  }
}