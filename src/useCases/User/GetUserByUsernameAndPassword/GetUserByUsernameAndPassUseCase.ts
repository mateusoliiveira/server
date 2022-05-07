import { IUsersRepository } from "../../../repositories/IUsersRepository"
import { IGetUserByUsernameAndPassRequestDTO } from "./GetUserByUsernameAndPassDTO"
import * as bcrypt from 'bcrypt'
import { User } from "../../../models/user.model"
import { BadRequestError } from "../../../errors/bad-request.error"
import { NotFoundError } from "../../../errors/not-found-request.error"

export class GetUserByUsernameAndPassUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(getUserByNameAndPassDto: IGetUserByUsernameAndPassRequestDTO): Promise<any> {
    const result: User = await this.usersRepository.findByUsername(getUserByNameAndPassDto.username)
    if (result == null) {
      throw new NotFoundError({ messagekey: 'not-found', log: "Usuário não encontrado" })
    }
    const checkPassword: boolean = await bcrypt.compare(getUserByNameAndPassDto.password, result.password)
    if (!checkPassword) {
      throw new BadRequestError({ messagekey: 'bad-request', log: "Senha incorreta" })
    }
    return result.toJSON()
  }
}