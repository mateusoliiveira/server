export interface ICreateJWTRequestDTO {
  user: {
    id: string
    name: string
    surname: string
    username: string
    password: string
    admin: boolean
    createdAt: string
    updatedAt: string
  }
}