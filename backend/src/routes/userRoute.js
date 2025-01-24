import express from 'express'
import { login, logout, resendVerificationLink, signUp, verifyUser } from '../controllers/userController.js'

const route = express.Router()

route.post('/signup', signUp)
route.post('/resendEmail', resendVerificationLink)
route.get('/verify/:token', verifyUser)
route.get('/login', login)
route.get('/logout', logout)


export default route