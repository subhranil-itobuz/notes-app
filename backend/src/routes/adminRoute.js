import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getAllUser } from '../controllers/adminController.js'


const adminRoute = express.Router()


adminRoute.get('/getAllUser', isAuthenticated, getAllUser)

export default adminRoute