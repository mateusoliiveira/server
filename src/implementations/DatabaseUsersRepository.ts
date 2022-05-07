import { IUsersRepository } from "../repositories/IUsersRepository"
import { User } from "../models/user.model"
import sequelize from "./sequelizeConnection"

export class DatabaseUsersRepository implements IUsersRepository {

  async findById(id: string): Promise<any> {
    return await sequelize.model('User').findOne({
      where: { id }
    })
  }

  async findByUsername(username: string): Promise<any> {
    return await sequelize.model('User').findOne({
      where: { username }
    })
  }

  async create(user: User): Promise<any> {
    return await sequelize.model('User').create({ ...user })
  }

  async update(user: User): Promise<any> {
    const { id } = user
    console.log(id)
    return await sequelize.model('User').update(user, { where: { id } })
  }

  async destroy(id: string): Promise<number> {
    return await sequelize.model('User').destroy({ where: { id } })
  }
}