import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import { dbConnect } from './src/utils/dbConnect.js'
import userRoute from './src/routes/userRoute.js'
import notesRoute from './src/routes/notesRoute.js'
import cookieParser from 'cookie-parser'

env.config({})

const app = express()
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
  origin: 'http://localhost:5500',
  credentials: true,
  exposedHeaders: "*"
}

app.use(cors(corsOptions))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

const port = process.env.PORT || 5000

dbConnect()

//all api
app.use('/api/user', userRoute)
app.use('/api/notes', notesRoute)

app.listen(port, () => {
  console.log(`server is running in port ${port}`)
})