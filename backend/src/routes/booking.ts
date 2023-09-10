import Router from 'koa-router';
import Booking from '../models/booking';
import Table from '../models/table';
import { Booking as BookingType } from '../typescript/types';
import Restaurant from '../models/restaurant';

import { DateTime } from 'luxon';

const router = new Router({ prefix: '/booking' });

router.post('/', async (ctx) => {
  const booking = ctx.request.body as BookingType;

  if (!booking.tableNumber || !booking.bookingTime || !booking.numberOfPeople) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid booking data' };
    return;
  }

  const table = await Table.findOne({ tableNumber: booking.tableNumber });
  if (!table) {
    ctx.status = 400;
    ctx.body = { error: 'Table does not exist' };
    return;
  }

  const restaurant = await Restaurant.findOne({ _id: table.restaurantId });
  if (!restaurant || !restaurant.workingHours) {
    ctx.status = 400;
    ctx.body = { error: 'Restaurant does not exist' };
    return;
  }


  const bookingTime = DateTime.fromISO(booking.bookingTime.toString(), { zone: 'Europe/Sarajevo' });
  const bookingHour = bookingTime.hour;


  if (bookingHour < restaurant.workingHours.start || bookingHour >= restaurant.workingHours.end) {
    ctx.status = 400;
    ctx.body = { error: 'Booking time falls outside the restaurant working hours' };
    return;
  }

  const hourBefore = bookingTime.minus({ hours: 1 })
  const hourAfter = bookingTime.plus({ hours: 1 });

  const conflictingBooking = await Booking.findOne({
    tableNumber: booking.tableNumber,
    bookingTime: {
      $lt: hourAfter.toJSDate(),
      $gte: hourBefore.toJSDate(),
    },
  });

  if (conflictingBooking) {
    ctx.status = 400;
    ctx.body = { error: 'Conflicting booking exists' };
    return;
  }

  ctx.body = await Booking.create(booking);
});

router.get('/', async (ctx) => {
  try {
    const { tableNumber } = ctx.query;
    if (!tableNumber) {
      ctx.status = 400;
      ctx.body = { error: 'Bad Request', message: 'Invalid tableNumber value provided' };
      return;
    }

    const bookings = await Booking.find({ tableNumber });
    ctx.body = bookings;
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
});

router.delete('/:bookingId', async (ctx) => {
  try {
    const { bookingId } = ctx.params;
    if (!bookingId) {
      ctx.status = 400;
      ctx.body = { error: 'Bad Request', message: 'Invalid bookingId value provided' };
      return;
    }

    console.log(bookingId)
    const deletedItem = await Booking.deleteOne({ _id: bookingId });
    ctx.body = deletedItem;
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
})

export default router;