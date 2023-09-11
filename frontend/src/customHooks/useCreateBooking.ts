import { useMutation, useQueryClient } from "react-query"
import { createBooking } from "../api/bookingApi"

type Props = {
  tableNumber: string
  setIsModalVisible: (state: boolean) => void
  setError: (error: string) => void
}

const useCreateBooking = ({ tableNumber, setIsModalVisible, setError }: Props) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(createBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings', tableNumber])
      setIsModalVisible(false)
    },
    onError: (error: string) => {
      setError(error.toString())
    }
  })

  return mutation
}

export default useCreateBooking
