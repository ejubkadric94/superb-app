import { useMutation, useQueryClient } from "react-query"
import { deleteBooking } from "../api/bookingApi"

type Props = {
  tableNumber: string
}

const useDeleteBooking = ({ tableNumber }: Props) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(deleteBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings', tableNumber])
    },
  })

  return mutation
}

export default useDeleteBooking