import express from 'express'
import "reflect-metadata"
import userRoute from './routes/user.route'
import guestRoute from './routes/guest.route'
import errorHanddlerMiddleware from './middlewares/error-handdles.middleware'
import cors from 'cors'
import JWTAuthGuard from './guards/jwt-authentication.guard'

const app = express()

app.use(express.json())
app.use(cors())
app.use("/guests",
    guestRoute)
app.use("/users",
    JWTAuthGuard,
    userRoute)
app.use(errorHanddlerMiddleware)

export { app }