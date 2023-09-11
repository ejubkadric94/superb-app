export interface Table {
  _id: string;
  tableNumber: number;
  restaurantId: string;
}

export interface Booking {
  _id: string;
  numberOfPeople: number;
  bookingTime: string;
} 

export type QueryParam = number | string;