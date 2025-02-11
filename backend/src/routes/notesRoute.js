import express from "express"
import { createNote, deleteNote, emptyAll, uploadFile, getAllNotes, getNoteById, updateNote, updateFile, deleteFile } from "../controllers/notesController.js"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { uploadNotesFile } from "../middleware/multer.js";

const notesRoute = express.Router()

notesRoute.post('/create', isAuthenticated, createNote);
notesRoute.post('/file/upload/:id', isAuthenticated, uploadNotesFile, uploadFile)
notesRoute.put('/file/update/:id', isAuthenticated, uploadNotesFile, updateFile)
notesRoute.delete('/file/delete/:id', isAuthenticated, deleteFile);
notesRoute.get('/getAllNotes', isAuthenticated, getAllNotes);
notesRoute.get('/getNote/:id', isAuthenticated, getNoteById);
notesRoute.put('/update/:id', isAuthenticated, updateNote);
notesRoute.delete('/delete/:id', isAuthenticated, deleteNote);
notesRoute.delete('/deleteAll', isAuthenticated, emptyAll);


export default notesRoute