import { DatabaseUsersRepository } from "../../../implementations/DatabaseUsersRepository"
import { DeleteUserUseCase } from "./DeleteUserUseCase"
import { DeleteUserController } from "./DeleteUserController"

const databaseUsersRepository = new DatabaseUsersRepository()

const deleteUserUseCase = new DeleteUserUseCase(
  databaseUsersRepository,
)

const deleteUserController = new DeleteUserController(
  deleteUserUseCase
)

export { deleteUserUseCase, deleteUserController }