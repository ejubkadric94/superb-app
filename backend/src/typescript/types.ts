export interface Booking {
  _id: String;
  tableNumber: Number;
  numberOfPeople: Number;
  bookingTime: string;
};

export interface WorkingHours {
  start: number;
  end: number;
}