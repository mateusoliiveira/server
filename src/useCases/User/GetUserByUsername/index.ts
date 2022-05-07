import { DatabaseUsersRepository } from "../../../implementations/DatabaseUsersRepository"
import { GetUserByUsernameUseCase } from "./GetUserByUsernameUseCase"
import { GetUserByUsernameController } from "./GetUserByUsernameController"

const databaseUsersRepository = new DatabaseUsersRepository()

const getUserByUsernameUseCase = new GetUserByUsernameUseCase(
  databaseUsersRepository,
)

const getUserByUsernameController = new GetUserByUsernameController(
  getUserByUsernameUseCase
)

export { getUserByUsernameUseCase, getUserByUsernameController }