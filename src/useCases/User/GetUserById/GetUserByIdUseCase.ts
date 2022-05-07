import { BadRequestError } from "../../../errors/bad-request.error"
import { User } from "../../../models/user.model"
import { IUsersRepository } from "../../../repositories/IUsersRepository"
import { IGetUserByIdRequestDTO } from "./GetUserByIdDTO"

export class GetUserByIdUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ id }: IGetUserByIdRequestDTO): Promise<User> {
    const result: User = await this.usersRepository.findById(id)
    if (!result) {
      throw new BadRequestError({
        log: `Não existe um usuário com o código ${id}`,
        messagekey: 'bad-request'
      })
    }
    return result
  }
}