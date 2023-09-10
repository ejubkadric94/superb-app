import { BACKEND_URL } from "../constants/constants";
import { Table } from "../typescript/types";

const Api = {
  fetchTablesUrl: (restaurantId: string) => `${BACKEND_URL}/table?restaurantId=${restaurantId}`,
  createTableUrl: () => `${BACKEND_URL}/table`,
  fetchBookingsUrl: (tableNumber: number) => `${BACKEND_URL}/booking?tableNumber=${tableNumber}`,
  deleteBookingUrl: (bookingId: string) => `${BACKEND_URL}/booking/${bookingId}`,
  createBookingUrl: () => `${BACKEND_URL}/booking`,
};

// GET
export async function fetchTables(restaurantId?: string): Promise<Table[]> {
  if (!restaurantId) {
    return Promise.resolve([]);
  }

  const response = await fetch(Api.fetchTablesUrl(restaurantId));

  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }

  return response.json();
}

// POST
export const createTable = async (restaurantId?: string) => {
  if (!restaurantId) {
    return Promise.reject('No restaurantId provided');
  }

  const response = await fetch(Api.createTableUrl(), {
    method: 'POST',
    body: JSON.stringify({ restaurantId }),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }

  return response.json();
};

//GET
export const fetchBookings = async (tableId?: string) => {
  if (!tableId) {
    return Promise.resolve([]);
  }

  const response = await fetch(Api.fetchBookingsUrl(parseInt(tableId, 10)));

  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }

  return response.json();
};

// DELETE
export const deleteBooking = async (bookingId: string) => {
  if (!bookingId) {
    return Promise.resolve(false);
  }

  const response = await fetch(Api.deleteBookingUrl(bookingId), {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }

  return response.json();
};

// POST
export const createBooking = async ({ tableNumber, bookingTime, numberOfPeople }: { bookingTime: Date, numberOfPeople: number, tableNumber: number }) => {
  const response = await fetch(Api.createBookingUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tableNumber, bookingTime, numberOfPeople }),
  })

  if (!response.ok) {
    const responseBody = await response.json()
    throw new Error(responseBody.error.toString() || 'Network response was not ok')
  }

  return response.json()
}
