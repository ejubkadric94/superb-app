import { DatePicker, InputNumber } from "antd"

type Props = {
  setSelectedDate: (date: Date | null) => void
  setError: (err: string) => void
  setNumberOfGuests: (number: number) => void
  error: string
}

const AddBookingModalContent = ({ setSelectedDate, setError, setNumberOfGuests, error }: Props) => {
  return (
    <>
      <div style={{ marginBottom: '1em' }}>
        <div>Booking Time</div>
        <DatePicker 
          showTime 
          onChange={(date) => {
            setSelectedDate(date ? date.toDate() : null)
            setError('')
          }} 
        />
      </div>
      <div style={{ marginBottom: '1em' }}>
        <div>Number of Guests</div>
        <InputNumber
          min={1} 
          max={10} 
          defaultValue={1} 
          onChange={(value) => {
            if (!value) {
              return
            }
            setNumberOfGuests(value)
            setError('')
          }} 
        />
      </div>
      {!!error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
    </>
  )
}

export default AddBookingModalContent
