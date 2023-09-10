import { useState } from 'react'
import { Button, Modal, DatePicker, InputNumber } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { createBooking } from '../api/api'

type Props = {
  tableNumber: string;
}

const AddBooking = ({ tableNumber }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [error, setError] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1)
  const queryClient = useQueryClient();

  const mutation = useMutation(createBooking, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings', tableNumber])
      setIsModalVisible(false)
    },
    onError: (error: string) => {
      setError(error.toString());
    }
  })

  const handleOk = () => {
    if (selectedDate && numberOfGuests) {
      mutation.mutate({ bookingTime: selectedDate, numberOfPeople: numberOfGuests, tableNumber: parseInt(tableNumber, 10) })
    } else {
      setError('Please fill all the fields')
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Button type="dashed" onClick={() => setIsModalVisible(true)}>
        Add Booking
      </Button>
      <Modal
        title="Add a new booking"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Create Booking
          </Button>,
        ]}
      >
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
      </Modal>
    </div>
  )
}

export default AddBooking
