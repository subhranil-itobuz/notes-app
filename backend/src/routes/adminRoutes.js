import express from 'express'
import { createAccount, createNoteForUser, deleteAllNotesOfUser, deleteNoteOfUser, deleteUser, getAllNotesOfUser, getAllUser, updateUserNameOfUser, verifyMailSend, verifyParticularUser } from '../controllers/adminController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import isAdmin from '../middleware/isAdmin.js'

const adminRoute = express.Router()


adminRoute.post('/createUser', isAuthenticated, isAdmin, createAccount)
adminRoute.put('/update/user/userName/:userId', isAuthenticated, isAdmin, updateUserNameOfUser)
adminRoute.get('/getAllUser', isAuthenticated, isAdmin, getAllUser)
adminRoute.get('/getAllNotes/user/:userId', isAuthenticated, isAdmin, getAllNotesOfUser)
adminRoute.post('/verifyMailSend/user/:userId', isAuthenticated, isAdmin, verifyMailSend)
adminRoute.post('/verify/user/:userId', isAuthenticated, isAdmin, verifyParticularUser)
adminRoute.delete('/user/note/delete/:userId/:noteId', isAuthenticated, isAdmin, deleteNoteOfUser)
adminRoute.delete('/user/note/deleteAll/:userId', isAuthenticated, isAdmin, deleteAllNotesOfUser)
adminRoute.delete('/user/delete/:userId', isAuthenticated, isAdmin, deleteUser)
adminRoute.post('/createNote/user/:userId', isAuthenticated, isAdmin, createNoteForUser)


export default adminRoute