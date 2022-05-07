import { DatabaseUsersRepository } from "../../../implementations/DatabaseUsersRepository"
import { UpdateUserUseCase } from "./UpdateUserUseCase"
import { UpdateUserController } from "./UpdateUserController"

const databaseUsersRepository = new DatabaseUsersRepository()

const updateUserUseCase = new UpdateUserUseCase(
  databaseUsersRepository,
)

const updateUserController = new UpdateUserController(
  updateUserUseCase
)

export { updateUserUseCase, updateUserController }