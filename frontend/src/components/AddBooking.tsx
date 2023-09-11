import { useState } from 'react'
import { Button, Modal } from 'antd'
import useCreateBooking from '../customHooks/useCreateBooking'
import AddBookingModalContent from '../modals/AddBookingModalContent'

type Props = {
  tableNumber: string
}

const AddBooking = ({ tableNumber }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [error, setError] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1)

  const mutation = useCreateBooking({ tableNumber, setIsModalVisible, setError })

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
        <AddBookingModalContent
          setSelectedDate={setSelectedDate}
          setError={setError}
          setNumberOfGuests={setNumberOfGuests}
          error={error}
        />
      </Modal>
    </div>
  )
}

export default AddBooking
