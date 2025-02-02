import express from 'express'
import { getUserDetails, login, logout, regenerateAccessToken, resendVerificationLink, signUp, updatePassword, updateUserName, verifyUser } from '../controllers/userController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'

const userRoute = express.Router()

userRoute.post('/signup', signUp)
userRoute.post('/resendEmail', resendVerificationLink)
userRoute.get('/verify', verifyUser)
userRoute.post('/login', login)
userRoute.get('/regenerateAccessToken', regenerateAccessToken)
userRoute.get('/logout', logout)
userRoute.get('/getUser', getUserDetails)
userRoute.put('/update/password', isAuthenticated, updatePassword)
userRoute.put('/update/userName', isAuthenticated, updateUserName)


export default userRoute