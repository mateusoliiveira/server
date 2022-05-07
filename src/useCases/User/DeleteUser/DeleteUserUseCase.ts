import { BadRequestError } from "../../../errors/bad-request.error"
import { User } from "../../../models/user.model"
import { IUsersRepository } from "../../../repositories/IUsersRepository"
import { IDeleteUserRequestDTO } from "./DeleteUserDTO"

export class DeleteUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ id }: IDeleteUserRequestDTO): Promise<any> {
    const findIfExist: User = await this.usersRepository.findById(id)
    if (!findIfExist) {
      throw new BadRequestError({
        log: `Não existe um usuário com o código ${id}`,
        messagekey: 'bad-request'
      })
    }
    const result: any = await this.usersRepository.destroy(id)
    return result
  }
}