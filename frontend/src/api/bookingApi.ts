import { Api, DELETE, GET, POST } from "./api";

export const fetchBookings = async (tableId?: string) => {
  if (!tableId) {
    return Promise.resolve([]);
  }

  return GET(Api.fetchBookingsUrl(parseInt(tableId, 10)));
};

export const deleteBooking = async (bookingId: string) => {
  if (!bookingId) {
    return Promise.resolve(false)
  }

  return DELETE(Api.deleteBookingUrl(bookingId))
};

export const createBooking = async ({ tableNumber, bookingTime, numberOfPeople }: { bookingTime: Date, numberOfPeople: number, tableNumber: number }) => {
  return POST(Api.createBookingUrl(), { tableNumber, bookingTime, numberOfPeople })
}
