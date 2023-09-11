import { useMutation, useQueryClient } from "react-query"
import { RESTAURANT_ID } from "../constants/constants"
import { changeWorkingHours } from "../api/restaurantApi"

const useChangeWorkingHours = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    ({ start, end, restaurantId}: { start: number, end: number, restaurantId?: string}) => changeWorkingHours({ start, end }, restaurantId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['restaurant', RESTAURANT_ID])
      },
    }
  )

  return mutation
}

export default useChangeWorkingHours
