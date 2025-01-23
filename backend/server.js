import express from 'express'
import env from 'dotenv'
import { dbConnect } from './src/utils/dbConnect.js'
import route from './src/routes/userRoute.js'

env.config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

dbConnect()

app.use('/', route)

app.listen(port, () => { 
  console.log(`server is running in port ${port}`)
 })