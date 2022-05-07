import { CreateJWTUseCase } from "./CreateJWTUseCase"
import { CreateJWTController } from "./CreateJWTController"

import { DatabaseUsersRepository } from "../../../implementations/DatabaseUsersRepository"
import { GetUserByUsernameAndPassUseCase } from "../../User/GetUserByUsernameAndPassword/GetUserByUsernameAndPassUseCase"

const databaseUsersRepository = new DatabaseUsersRepository()

const getUserByUsernameAndPassUseCase = new GetUserByUsernameAndPassUseCase(
  databaseUsersRepository,
)

const createJWTUseCase = new CreateJWTUseCase()

const createJWTController = new CreateJWTController(
  getUserByUsernameAndPassUseCase,
  createJWTUseCase
)

export { createJWTUseCase, createJWTController }