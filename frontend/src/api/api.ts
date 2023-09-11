import { BACKEND_URL } from "../constants/constants"

export const Api = {
  fetchTablesUrl: (restaurantId: string | number) => `${BACKEND_URL}/table?restaurantId=${restaurantId}`,
  createTableUrl: () => `${BACKEND_URL}/table`,
  fetchBookingsUrl: (tableNumber: string | number) => `${BACKEND_URL}/booking?tableNumber=${tableNumber}`,
  deleteBookingUrl: (bookingId: string) => `${BACKEND_URL}/booking/${bookingId}`,
  createBookingUrl: () => `${BACKEND_URL}/booking`,
  fetchRestaurant: (restaurantId: string) => `${BACKEND_URL}/restaurant/${restaurantId}`,
  setWorkingHours: (restaurantId: string) => `${BACKEND_URL}/restaurant/${restaurantId}/setWorkingHours`
}

export const GET = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error((error || ('Network response was not ok ' + response.statusText)))
  }

  return response.json()
}

export const POST = async (url: string, body: Object) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error((error || ('Network response was not ok ' + response.statusText)))
  }

  return response.json()
}

export const DELETE = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error((error || ('Network response was not ok ' + response.statusText)))
  }

  return response.json()
}
