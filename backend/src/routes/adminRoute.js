import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { deleteUser, getAllUser } from '../controllers/adminController.js'


const adminRoute = express.Router()

adminRoute.get('/getAllUser', isAuthenticated, getAllUser)
adminRoute.delete('/delete/user/:userId', isAuthenticated, deleteUser)


export default adminRoute