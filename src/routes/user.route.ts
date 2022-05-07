import { NextFunction, Request, Response, Router } from "express"
import { deleteUserController } from "../useCases/User/DeleteUser"
import { getUserByUsernameController } from "../useCases/User/GetUserByUsername"
import { getUserByIdController } from "../useCases/User/GetUserById"
import { updateUserController } from "../useCases/User/UpdateUser"
import { ForbiddenError } from "../errors/forbidden.error"

const router = Router()

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string
      admin: boolean
      username: string
      name: string
      surname: string
      createdAt: string
      updatedAt: string
    }
  }
}

router.get('/', (request: Request, response: Response, next: NextFunction) => {
  try {
    request.user
    return response.status(200).send(request.user)
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', (request: Request, response: Response, next: NextFunction) => {
  try {
    return getUserByIdController.handle(request, response, next)
  } catch (error) {
    return next(error)
  }
})

router.get('/:username', (request: Request, response: Response, next: NextFunction) => {
  try {
    return getUserByUsernameController.handle(request, response, next)
  } catch (error) {
    return next(error)
  }
})

router.patch('/', (request: Request, response: Response, next: NextFunction) => {
  try {
    console.log(request.body)
    return updateUserController.handle(request, response, next)
  } catch (error) {
    return next(error)
  }
})

router.delete('/:id', (request: Request, response: Response, next: NextFunction) => {
  try {
    const { admin } = request.user
    if (!admin) {
      throw new ForbiddenError({ messagekey: 'forbidden', log: 'Você não está autorizado a essa ação' })
    }
    return deleteUserController.handle(request, response, next)
  } catch (error) {
    return next(error)
  }
})

export default router 