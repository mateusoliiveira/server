import { NextFunction, Request, Response } from "express"
import { CreateUserUseCase } from "./CreateUserUseCase"


export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) { }

  async handle(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const { body } = request
    try {
      const result: any = await this.createUserUseCase.execute(body)
      return response.status(201).send(result)
    } catch (error) {
      next(error)
    }
  }
}