import { faker } from '@faker-js/faker'
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs'

const generateUserModel = async (count = 5) => {
  const userdata = []
  const salt = await bcrypt.genSalt(10);

  for (let i = 0; i < count; i++) {
    userdata.push({
      userName: faker.internet.username(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password().replace(/\s/g, '').trim(), salt),
      verified: true
    })
  }

  return userdata;
}

export const createDummyUser = async (dataCount) => {
  let inserted = 0;
  while (inserted < dataCount) {
    const testData = await generateUserModel(dataCount)
    await userModel.insertMany(testData)
    inserted += testData.length
  }

  console.log(`Inserted ${dataCount} records of Users`)
}