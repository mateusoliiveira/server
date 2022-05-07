import { BeforeCreate, Column, HasMany, Model, Table, Sequelize, DataType } from 'sequelize-typescript'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import { BadRequestError } from '../errors/bad-request.error'

@Table({
  timestamps: true,
  tableName: 'users'
})
export class User extends Model {
  @Column({
    unique: true,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => randomUUID()
  })
  id: string

  @Column({
    defaultValue: false,
    allowNull: false,
    type: DataType.BOOLEAN(),
  })
  admin: boolean

  @Column({
    unique: true,
    allowNull: false,
    type: DataType.STRING(50),
    validate: {
      len: {
        args: [6, 50],
        msg: 'O seu email precisa ter entre 6 e 50 caracteres'
      },
      isEmail: {
        msg: 'Informe um email válido'
      },
      isUnique: (username) => {
        User.findOne({ where: { username } })
          .then((u) => {
            if (u) {
              return new BadRequestError({ messagekey: 'bad-request', log: 'Usuário já cadastrado.' })
            }
          })
      }
    }
  })
  username: string

  @Column({
    set(val: string): void {
      this.setDataValue('name', val.split(' ')
        .map((char, index) =>
          char.charAt(0)
            .toUpperCase() + [...char]
              .splice(1)
              .join('')
              .toLowerCase())
        .join(' '))
    },
    allowNull: false,
    type: DataType.STRING(25),
    validate: {
      len: {
        args: [3, 25],
        msg: 'O seu nome precisa ter entre 3 e 25 caracteres'
      }
    }
  })
  name: string

  @Column({
    set(val: string): void {
      this.setDataValue('surname', val.split(' ')
        .map((char, index) =>
          char.charAt(0)
            .toUpperCase() + [...char]
              .splice(1)
              .join('')
              .toLowerCase())
        .join(' '))
    },
    allowNull: false,
    type: DataType.STRING(25),
    validate: {
      len: {
        args: [3, 25],
        msg: 'O seu sobrenome precisa ter entre 3 e 25 caracteres'
      }
    }
  })
  surname: string

  @Column({
    allowNull: false,
    type: DataType.STRING(),
    validate: {
      len: {
        args: [8, 20],
        msg: 'Sua senha precisa ter entre 6 e 20 caracteres'
      },
      is: {
        args: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        msg: 'Sua senha precisa ter pelo menos uma letra e um número'
      }
    }
  })
  password: string

  @BeforeCreate
  static async hashPasswordBeforeCreate(user: User): Promise<void> {
    if (user) {
      const saltOrRounds: number = 10
      const password: string = user.password
      const hash: string = await bcrypt.hash(password, saltOrRounds)
      user.password = hash
    }
  }
}


