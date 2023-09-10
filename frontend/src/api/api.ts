import { BACKEND_URL } from "../constants/constants";
import { Table } from "../typescript/types";

const Api = {
  fetchTablesUrl: (restaurantId: string) => `${BACKEND_URL}/table?restaurantId=${restaurantId}`,
  createTable: () => `${BACKEND_URL}/table`,
};

export async function fetchTables(restaurantId?: string): Promise<Table[]> {
  if (!restaurantId) {
    return Promise.resolve([]);
  }

  const response = await fetch(Api.fetchTablesUrl(restaurantId));

  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }

  return await response.json();
}

export const createTable = async (restaurantId?: string) => {
  if (!restaurantId) {
    return Promise.reject('No restaurantId provided');
  }

  const response = await fetch(Api.createTable(), {
    method: 'POST',
    body: JSON.stringify({ restaurantId }),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }

  return await response.json();
};

