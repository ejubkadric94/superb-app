import { Button, Card, Typography } from "antd"
import { Booking } from "../typescript/types"
import { CloseOutlined } from '@ant-design/icons'
import useDeleteBooking from "../customHooks/useDeleteBooking"

const { Text } = Typography

type Props = {
  booking: Booking
  index: number
  tableNumber: string
}

const BookingCard = ({ booking, index, tableNumber }: Props) => {
  const mutation = useDeleteBooking({ tableNumber })

  const handleDelete = async (bookingId: string) => {
    try {
      await mutation.mutateAsync(bookingId)
    } catch (error) {
      console.error('Error deleting the booking:', error)
    }
  }
  
  return (
    <Card className='table-details' key={booking._id} title={`Booking ${index + 1}`} >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text strong>Number of guests: </Text>{booking.numberOfPeople}<br/>
          <Text strong>Booking time: </Text>{booking.bookingTime}
        </div>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={(e) => { e.stopPropagation(); handleDelete(booking._id) }}
          title="Delete booking"
        />
      </div>
    </Card>
  )
}

export default BookingCard
