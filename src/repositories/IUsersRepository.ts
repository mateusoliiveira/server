import { User } from "../models/user.model"
import { ICreateUserRequestDTO } from "../useCases/User/CreateUser/CreateUserDTO"
import { IUpdateUserRequestDTO } from "../useCases/User/UpdateUser/UpdateUserDTO"

export interface IUsersRepository {
  findByUsername(username: string): Promise<User>
  findById(id: string): Promise<User>
  create(ICreateUserRequestDTO: ICreateUserRequestDTO): Promise<User>
  update(IUpdateUserRequestDTO: IUpdateUserRequestDTO): Promise<number>
  destroy(id: string): Promise<any>
}