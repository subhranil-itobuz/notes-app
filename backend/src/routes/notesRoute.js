import express from "express"
import { createNote, deleteNote, emptyAll, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js"
import isAuthenticated from "../middleware/isAuthenticated.js";

const notesRoute = express.Router()

notesRoute.post('/create', isAuthenticated, createNote);
notesRoute.get('/getAllNotes', isAuthenticated, getAllNotes);
notesRoute.get('/getNote/:id', isAuthenticated, getNoteById);
notesRoute.put('/update/:id', isAuthenticated, updateNote);
notesRoute.delete('/delete/:id', isAuthenticated, deleteNote);
notesRoute.delete('/deleteAll', isAuthenticated, emptyAll);



export default notesRoute