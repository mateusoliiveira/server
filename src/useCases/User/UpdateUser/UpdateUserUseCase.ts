import { BadRequestError } from "../../../errors/bad-request.error"
import { User } from "../../../models/user.model"
import { IUsersRepository } from "../../../repositories/IUsersRepository"
import { IUpdateUserRequestDTO } from "./UpdateUserDTO"

export class UpdateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string, updateUserDto: IUpdateUserRequestDTO): Promise<number> {
    const userFindById: User = await this.usersRepository.findById(id)
    if (!userFindById) {
      throw new BadRequestError({
        log: `Não existe um usuário com o código ${id}`,
        messagekey: 'bad-request'
      })
    }
    const result: number = await this.usersRepository.update({ id, ...updateUserDto })
    return result
  }
}