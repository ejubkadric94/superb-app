import Router from 'koa-router';
import Booking from '../models/booking';
import { Booking as BookingType } from '../typescript/types';
import { validateNewBooking } from '../helpers/validators';

const router = new Router({ prefix: '/booking' });

/**
 * @api {post} / Create Booking
 * @apiName CreateBooking
 * @apiGroup Booking
 * 
 * @apiHeader {String} Content-Type Application/json
 * 
 * @apiParam {Number} tableNumber The number of the table being booked (Required).
 * @apiParam {String} bookingTime The time of the booking, in ISO string format (Required).
 * @apiParam {Number} numberOfPeople The number of people for the booking (Required).
 * 
 * @apiSuccess {Object} booking The created booking object.
 * 
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {String} 400.error The error message.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/400 Bad Request
 *     {
 *       "error": "Invalid booking data"
 *     }
 * 
 */
router.post('/', async (ctx) => {
  try {
    const booking = ctx.request.body as BookingType;
  
    const bookingValidator = await validateNewBooking(booking);
    if (bookingValidator?.error) {
      ctx.status = 400;
      ctx.body = { error: bookingValidator?.errorMessage };
      return;
    }
  
    ctx.body = await Booking.create(booking);
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
});

/**
 * @api {get} / Fetch Bookings by Table Number
 * @apiName GetBookings
 * @apiGroup Booking
 * 
 * @apiHeader {String} Content-Type Application/json
 * 
 * @apiParam {Number} tableNumber The number of the table for fetching bookings (Required).
 * 
 * @apiSuccess {Array} bookings An array containing all booking objects associated with the provided table number.
 * 
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {String} 400.error The error message.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/400 Bad Request
 *     {
 *       "error": "Invalid tableNumber value provided"
 *     }
 * 
 * @apiError {String} 500 Server error details (in development mode).
 * 
 */
router.get('/', async (ctx) => {
  try {
    const { tableNumber } = ctx.query;
    if (!tableNumber) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid tableNumber value provided' };
      return;
    }

    const bookings = await Booking.find({ tableNumber });
    ctx.body = bookings;
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
});

/**
 * @api {delete} /:bookingId Delete Booking by ID
 * @apiName DeleteBooking
 * @apiGroup Booking
 * 
 * @apiHeader {String} Content-Type Application/json
 * 
 * @apiParam {String} bookingId The ID of the booking to be deleted (Required).
 * 
 * @apiSuccess {Object} deletedItem An object containing the details of the deletion operation, including a count of the number of deleted documents.
 * 
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {String} 400.error The error message.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/400 Bad Request
 *     {
 *       "error": "Invalid bookingId value provided"
 *     }
 * 
 * @apiError {String} 500 Server error details (in development mode).
 * 
 */
router.delete('/:bookingId', async (ctx) => {
  try {
    const { bookingId } = ctx.params;
    if (!bookingId) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid bookingId value provided' };
      return;
    }

    const deletedItem = await Booking.deleteOne({ _id: bookingId });
    ctx.body = deletedItem;
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
})

export default router;