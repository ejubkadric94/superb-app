import { Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchBookings } from '../api/api';
import { Booking as BookingType } from '../typescript/types';
import BookingCard from '../components/BookingCard';
import BackNavigationButton from '../components/BackNavigationButton';

import './TableDetails.css';
import AddBooking from '../components/AddBooking';

const { Title, Text } = Typography;

const TableDetails = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();

  const { data: bookings, error, isLoading } = useQuery(['bookings', tableNumber], () => fetchBookings(tableNumber));

  if (!tableNumber) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div style={{ padding: '16px' }}>
      <BackNavigationButton />
      <AddBooking tableNumber={tableNumber} />
      <Title level={3}>Bookings of table {tableNumber}</Title>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking: BookingType, index: number) => (
          <BookingCard booking={booking} index={index} tableNumber={tableNumber!} key={index} />
        ))
      ) : (
        <Text>No bookings available</Text>
      )}
    </div>
  );
};

export default TableDetails;