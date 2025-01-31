import { faker } from '@faker-js/faker'
import userModel from '../models/userModel.js';

const generateUserModel = async (count = 5) => {
  const userdata = []

  for (let i = 0; i < count; i++) {
    userdata.push({
      userName: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      verified: true
    })
  }

  return userdata;
}

export const createDummyUser = async (dataCount) => {
  let inserted = 0;
  while (inserted < dataCount) {
    const testData = await generateUserModel(5)
    await userModel.insertMany(testData)
    inserted += testData.length
  }

  console.log(`Inserted ${dataCount} records of Users`)
}