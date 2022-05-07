import { DatabaseUsersRepository } from "../../../implementations/DatabaseUsersRepository"
import { GetUserByIdUseCase } from "./GetUserByIdUseCase"
import { GetUserByIdController } from "./GetUserByIdController"

const databaseUsersRepository = new DatabaseUsersRepository()

const getUserByIdUseCase = new GetUserByIdUseCase(
  databaseUsersRepository,
)

const getUserByIdController = new GetUserByIdController(
  getUserByIdUseCase
)

export { getUserByIdUseCase, getUserByIdController }