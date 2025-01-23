import express from 'express'
import { login, signUp } from '../controllers/userController.js'

const route = express.Router()

route.post('/signup', signUp)
route.get('/login', login)

export default route