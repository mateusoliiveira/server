import { BadRequestError } from "../../../errors/bad-request.error"
import { User } from "../../../models/user.model"
import { IUsersRepository } from "../../../repositories/IUsersRepository"
import { IGetUserByUsernameRequestDTO } from "./GetUserByUsernameDTO"

export class GetUserByUsernameUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ username }: IGetUserByUsernameRequestDTO): Promise<User> {
    const result: User = await this.usersRepository.findByUsername(username)
    if (!result) {
      throw new BadRequestError({
        log: `Não existe um usuário com o email ${username}`,
        messagekey: 'bad-request'
      })
    }
    return result
  }
}