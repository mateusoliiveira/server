import { DatabaseUsersRepository } from "../../../implementations/DatabaseUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { CreateUserController } from "./CreateUserController"

const databaseUsersRepository = new DatabaseUsersRepository()

const createUserUseCase = new CreateUserUseCase(
  databaseUsersRepository,
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export { createUserUseCase, createUserController }