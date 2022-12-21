import 'express-async-errors'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './db/connect.js'


// db and authenticateUser


//  routers
import authRouter from './routes/authRoutes.js'
import activityRouter from './routes/activityRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js';

const app = express()

dotenv.config()


if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(express.json())

app.get('/', (req, res) => {
    // throw new Error('error')
    res.send('Up and Down!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/activities', authenticateUser, activityRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()