import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import { dbConnect } from './src/utils/dbConnect.js'
import userRoute from './src/routes/userRoute.js'
import notesRoute from './src/routes/notesRoute.js'
import adminRoute from './src/routes/adminRoutes.js'

env.config({})

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

const app = express()
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors(corsOptions))

const port = process.env.PORT || 5000

dbConnect()

//all api
app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)
app.use('/api/notes', notesRoute)

app.listen(port, () => {
  console.log(`server is running in port ${port}`)
})