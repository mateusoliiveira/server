import { ICreateJWTRequestDTO } from "./CreateJWTDTO"
import JWT from "jsonwebtoken"

export class CreateJWTUseCase {
  async execute({ user }: ICreateJWTRequestDTO) {
    const token = JWT.sign({ user }, "secretsecret", {
      expiresIn: '30d',
      audience: 'consuumer-id',
      subject: user.id,
    })
    return token
  }
}