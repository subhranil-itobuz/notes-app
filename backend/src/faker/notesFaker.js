import { faker } from '@faker-js/faker'
import notesModel from '../models/notesModel.js'
import userModel from '../models/userModel.js'

const generateNotesModel = async (count = 5) => {
  const notesData = []

  const users = await userModel.find()

  
  for (let i = 0; i < count; i++) {
    const randomUser = Math.floor(Math.random() * users.length)
    notesData.push({
      user: users[randomUser]._id,
      title: faker.person.bio(),
      description: faker.lorem.lines(1)
    })
  }

  return notesData;
}

export const createDummyNote = async (dataCount) => {
  let inserted = 0;
  while (inserted < dataCount) {
    const testData = await generateNotesModel(5)
    await notesModel.insertMany(testData)
    inserted += testData.length
  }

  console.log(`Inserted ${dataCount} records of Notes`)
}