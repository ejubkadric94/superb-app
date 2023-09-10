import mongoose from "mongoose";
import Restaurant from "./models/restaurant";
import { MONGO_URL } from "./constants";

const addRestaurant = async () => {
  try {
    await Restaurant.create({
      _id: "6b2c3572-8e2f-4bbe-b2bf-d4279608e93f",
      restaurantName: "Superb Restaurant",
      workingHours: {
        start: 8,
        end: 23,
      },
      managerIds: [],
    });
  } catch (error) {
    await mongoose.connection.close();
  } finally {
    await mongoose.connection.close();
  }

};

mongoose.connect(MONGO_URL, { dbName: 'superb' });

addRestaurant();