import mongoose from "mongoose";
import { uuid } from "uuidv4";

const TableSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  tableNumber: { type: Number, unique: true },
  restaurantId: String,
});

const Table = mongoose.model('Table', TableSchema);

export default Table;
