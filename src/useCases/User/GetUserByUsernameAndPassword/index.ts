import { DatabaseUsersRepository } from "../../../implementations/DatabaseUsersRepository"
import { GetUserByUsernameAndPassUseCase } from "./GetUserByUsernameAndPassUseCase"
import { GetUserByUsernameAndPassController } from "./GetUserByUsernameAndPassController"

const databaseUsersRepository = new DatabaseUsersRepository()

const getUserByUsernameAndPassUseCase = new GetUserByUsernameAndPassUseCase(
  databaseUsersRepository,
)

const getUserByUsernameAndPassController = new GetUserByUsernameAndPassController(
  getUserByUsernameAndPassUseCase
)

export { getUserByUsernameAndPassUseCase, getUserByUsernameAndPassController }
