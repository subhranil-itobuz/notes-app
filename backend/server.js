import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import { dbConnect } from './src/utils/dbConnect.js'
import userRoute from './src/routes/userRoute.js'
import notesRoute from './src/routes/notesRoute.js'
import cookieParser from 'cookie-parser'

env.config({})

const a = 10
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

const corsOptions = {
  origin: 'http://localhost:5500',
  credentials: true,
  exposedHeaders: "*"
}

app.use(cors(corsOptions))

const port = process.env.PORT || 5000

dbConnect()

//all api
app.use('/api/user', userRoute)
app.use('/api/notes', notesRoute)

app.listen(port, () => {
  console.log(`server is running in port ${port}`)
})