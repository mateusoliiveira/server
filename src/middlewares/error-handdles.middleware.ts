import { NextFunction, Request, Response } from "express"
import { ForbiddenError } from "../errors/forbidden.error"
import { BadRequestError } from "../errors/bad-request.error"
import HttpResponse from "../models/http-response.model"
import { NotFoundError } from "../errors/not-found-request.error"

const UNEXPECTED_ERROR = new HttpResponse<void>(
  500,
  {
    http: "unexpected-error",
    message: "Please, try again later, we have an error in database.",
  }
)

const FORBIDDEN_ERROR = new HttpResponse<void>(401, {
  http: "forbidden",
  message: "Please, log in, you're not authorized.",
})

const BAD_REQUEST_ERROR = new HttpResponse<void>(400, {
  http: "bad-request",
  message: "Please, review your data, it's incorrect.",
})

const NOT_FOUND_ERROR = new HttpResponse<void>(404, {
  http: "not-found",
  message: "Not found in our database.",
})

const errorHanddlerMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let errorResponse = UNEXPECTED_ERROR
  if (error instanceof ForbiddenError) {
    errorResponse = FORBIDDEN_ERROR
  }
  if (error instanceof BadRequestError) {
    errorResponse = BAD_REQUEST_ERROR
  }
  if (error instanceof NotFoundError) {
    errorResponse = NOT_FOUND_ERROR
  }
  return response.status(errorResponse.status).send({ main: errorResponse, error })
}

export default errorHanddlerMiddleware
