import { useMutation, useQueryClient } from "react-query"
import { createTable } from "../api/tableApi"
import { RESTAURANT_ID } from "../constants/constants"

const useCreateTable = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (restaurantId?: string) => createTable(restaurantId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tables', RESTAURANT_ID])
      },
    }
  )

  return mutation
}

export default useCreateTable
