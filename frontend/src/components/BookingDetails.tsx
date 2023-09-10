import { useParams } from 'react-router-dom'

const BookingDetails = () => {
  let { bookingId } = useParams<{ bookingId: string }>()
  return <div>Booking Detail for booking ID: {bookingId}</div>
}

export default BookingDetails
