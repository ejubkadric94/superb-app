import mongoose from 'mongoose';
import Table from '../models/table';
import Restaurant from '../models/restaurant';

const mongoTestURI = 'mongodb://localhost:27017/superb';

export const setupTestDB = async () => {
  await mongoose.connect(mongoTestURI);
  await Restaurant.create({
    _id: "6b2c3572-8e2f-4bbe-b2bf-d4279608e93f",
    restaurantName: "Superb Restaurant",
    workingHours: {
      start: 8,
      end: 23,
    },
    managerIds: [],
  });
  await Table.create({ restaurantId: '6b2c3572-8e2f-4bbe-b2bf-d4279608e93f', tableNumber: 1 });
};

export const teardownTestDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
