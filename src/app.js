import express from 'express'
import errorHandler from './utils/error.handler.js'
import Routes from './routes/router.js'
import 'dotenv/config'
import { pool, setTables } from './config/database.js'
import { swaggerUiMiddleware, swaggerUiSetup } from './../swagger.js'

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUiMiddleware, swaggerUiSetup)
app.use('/api/', Routes())  
app.use(errorHandler)



const PORT = process.env.PORT


const initApp = async () => {
    try {
        await pool.connect()
        console.log("Database connected.")
        await setTables()
        app.listen(PORT, () => console.log("Server is running port ", PORT))
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}
initApp()