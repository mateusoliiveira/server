import { Sequelize } from 'sequelize-typescript'
import { User } from '../models/user.model'

const sequelize = new Sequelize({
    host: '',
    dialect: 'postgres',
    database: '',
    username: '',
    port: 5432,
    password: '',
    models: [User],
})

//sequelize.sync({ force: true })
//console.log("All models were synchronized successfully.")

export default sequelize