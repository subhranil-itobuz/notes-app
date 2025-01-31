import mongoose from "mongoose"
import userModel from "../models/userModel.js"
import { createDummyUser } from "./userFaker.js"
import dotenv from 'dotenv'
import { createDummyNote } from "./notesFaker.js"
import notesModel from "../models/notesModel.js"

dotenv.config({})

const createDummy = async () => {
  await mongoose.connect('mongodb://root:example@localhost:4002/notesApp?authSource=admin')

  await userModel.deleteMany()
  await notesModel.deleteMany()

  console.log('Database reset')

  await createDummyUser(5)
  await createDummyNote(5)
}
createDummy()