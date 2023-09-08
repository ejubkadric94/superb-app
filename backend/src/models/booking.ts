import mongoose from "mongoose";
import { uuid } from "uuidv4";

const BookingSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  tableNumber: { type: Number, index: true, required: true }, 
  numberOfPeople: Number,
  bookingTime: { type: Date, index: true, required: true },
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
