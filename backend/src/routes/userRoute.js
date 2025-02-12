import express from 'express'

import { getUserDetails, login, logout, regenerateAccessToken, resendVerificationLink, signUp, updatePassword, updateProfilePicture, updateUserName, verifyUser } from '../controllers/userController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { uploadProfilePicture } from '../middleware/multer.js'

const userRoute = express.Router()

userRoute.post('/signup', signUp)
userRoute.post('/resendEmail', resendVerificationLink)
userRoute.post('/verify/:token', verifyUser)
userRoute.post('/login', login)
userRoute.get('/regenerateAccessToken', regenerateAccessToken)
userRoute.get('/logout', logout)
userRoute.get('/getUser', getUserDetails)
userRoute.put('/update/password', isAuthenticated, updatePassword)
userRoute.put('/update/userName', isAuthenticated, updateUserName)
userRoute.post('/update/profilePicture', isAuthenticated, uploadProfilePicture, updateProfilePicture)


export default userRoute