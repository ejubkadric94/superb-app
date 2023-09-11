import { useState } from 'react';
import { Modal, Button, TimePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import useChangeWorkingHours from '../customHooks/useChangeWorkingHours';
import { RESTAURANT_ID } from '../constants/constants';
import { getHourInSarajevoTimezone, isStartAfterTheEnd } from '../helpers/timeHelper';

type Props = {
  workingHours: {
    start: number;
    end: number;
  }
}

const ChangeWorkingHours = ({ workingHours }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startTime, setStartTime] = useState(dayjs().hour(workingHours.start).minute(0).second(0).toDate());
  const [endTime, setEndTime] = useState(dayjs().hour(workingHours.end).minute(0).second(0).toDate());
  const [error, setError] = useState<string>('')

  const mutation = useChangeWorkingHours();

  const handleOk = () => {
    const startInCorrectTimezone = getHourInSarajevoTimezone(startTime);
    const endInCorrectTimezone = getHourInSarajevoTimezone(endTime);

    if (endInCorrectTimezone <= startInCorrectTimezone) {
      setError('Start time must be before end time')
      return
    }

    mutation.mutate({ start: startInCorrectTimezone, end: endInCorrectTimezone, restaurantId: RESTAURANT_ID });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='change-working-hours-button'>
      <Button icon={<EditOutlined />} onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        title="Change working hours"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !!error }}
      >
        <div>
          <label>Start Time: </label>
          <TimePicker
            format="HH:mm"
            value={dayjs(startTime)}
            onChange={(time) => {
              const timeValue = time ? time.toDate() : new Date()
              setStartTime(timeValue)

              if (isStartAfterTheEnd(timeValue, endTime)) {
                setError('Start time must be before end time')
              } else {
                setError('')
              }
            }}
          />
        </div>
        <div>
          <label>End Time: </label>
          <TimePicker
            format="HH:mm"
            value={dayjs(endTime)}
            onChange={(time) => {
              const timeValue = time ? time.toDate() : new Date()
              setEndTime(timeValue)

              if (isStartAfterTheEnd(startTime, timeValue)) {
                setError('Start time must be before end time')
              } else {
                setError('')
              }
            }}
          />
        </div>
        {!!error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
      </Modal>
    </div>
  );
};

export default ChangeWorkingHours;
