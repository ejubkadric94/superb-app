import mongoose from "mongoose";
import { uuid } from "uuidv4";

const RestaurantSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  restaurantName: String,
  workingHours: {
    start: { type: Number, required: true },
    end: { type: Number, required: true }
  },
  managerIds: [{
    type: String
  }]
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant;
