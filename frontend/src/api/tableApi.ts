import { Table } from "../typescript/types"
import { Api, GET, POST } from "./api"

export async function fetchTables(restaurantId?: string): Promise<Table[]> {
  if (!restaurantId) {
    return Promise.resolve([])
  }

  return GET(Api.fetchTablesUrl(restaurantId))
}

export const createTable = async (restaurantId?: string) => {
  if (!restaurantId) {
    return Promise.reject('No restaurantId provided')
  }

  return POST(Api.createTableUrl(), { restaurantId })
};