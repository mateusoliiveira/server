import { NextFunction, Request, Response, Router } from "express"
import { createJWTController } from "../useCases/Auth/CreateJWT"
import { ICreateJWTRequestDTO } from "../useCases/Auth/CreateJWT/CreateJWTDTO"
import { createUserController } from "../useCases/User/CreateUser"

const router = Router()

router.post('/register', (request: Request, response: Response, next: NextFunction) => {
  try {
    return createUserController.handle(request, response, next)
  } catch (error) {
    return next(error)
  }
})

router.post('/login', (request: Request & ICreateJWTRequestDTO, response: Response, next: NextFunction) => {
  try {
    return createJWTController.handle(request, response, next)
  } catch (error) {
    return next(error)
  }
})

export default router 