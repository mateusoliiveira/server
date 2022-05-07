import { IUsersRepository } from "../../../repositories/IUsersRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO"
import { BadRequestError } from "../../../errors/bad-request.error"
import { User } from "../../../models/user.model"

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  async execute(createUserDto: ICreateUserRequestDTO): Promise<User> {
    const findIfExist: User = await this.usersRepository.findByUsername(createUserDto.username)
    if (findIfExist) {
      throw new BadRequestError({
        log: `Um usuário com o email ${createUserDto.username} já existe`,
        messagekey: 'bad-request'
      })
    }
    const result: User = await this.usersRepository.create(createUserDto)
    return result
  }
}