import { Api, GET, POST } from "./api"

export const fetchRestaurant = async (restaurantId?: string) => {
  if (!restaurantId) {
    return Promise.reject('No restaurantId provided')
  }

  return GET(Api.fetchRestaurant(restaurantId));
}

export const changeWorkingHours = async (workingHours: { start: number; end: number }, restaurantId?: string) => {
  if (!restaurantId) {
    return Promise.reject('No restaurantId provided')
  }

  return POST(Api.setWorkingHours(restaurantId), workingHours);
}