export interface IUpdateUserRequestDTO {
  id?: string
  name?: string
  surname: string
  username?: string
  password?: string
  actualPassword?: string
  newPassword?: string
}