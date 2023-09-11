import { DateTime } from "luxon";
import Restaurant from "../models/restaurant";
import Table from "../models/table";
import { Booking as BookingType, WorkingHours } from "../typescript/types";
import Booking from "../models/booking";

/**
 * @function
 * @async
 * @name validateNewBooking
 * @description Validates the booking details before creation.
 * 
 * @param {Object} booking The booking details.
 * @param {Number} booking.tableNumber The number of the table being booked.
 * @param {String} booking.bookingTime The time of the booking, in ISO string format.
 * @param {Number} booking.numberOfPeople The number of people for the booking.
 * 
 * @returns {Promise<null|Object>} Null if the validation is successful, or an object containing error details if validation fails.
 */
export const validateNewBooking = async (booking: BookingType) => {
  if (!booking.tableNumber || !booking.bookingTime || !booking.numberOfPeople) {
    return {
      error: true,
      errorMessage: 'Invalid booking data'
    };
  }

  const table = await Table.findOne({ tableNumber: booking.tableNumber });
  if (!table) {
    return {
      error: true,
      errorMessage: 'Table does not exist'
    };
  }

  const restaurant = await Restaurant.findOne({ _id: table?.restaurantId });
  if (!restaurant || !restaurant?.workingHours) {
    return {
      error: true,
      errorMessage: 'Restaurant does not exist'
    };
  }

  // Check if booking time is outside of restaurant working houts
  const bookingTime = DateTime.fromISO(booking.bookingTime.toString());
  const bookingHour = bookingTime.hour;
  if (bookingHour < restaurant!.workingHours!.start || bookingHour >= restaurant!.workingHours!.end) {
    return {
      error: true,
      errorMessage: 'Booking time falls outside the restaurant working hours'
    };
  }


  // Check for conflicting hours
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
    return {
      error: true,
      errorMessage: 'Conflicting booking exists'
    };
  }

  return null;
}

export const validateWorkingHours = (restaurantId: string, { start, end }: WorkingHours) => {
  if (start === undefined || end === undefined || typeof start !== 'number' || typeof end !== 'number' || start < 0 || end > 24) {
    return { error: true, errorMessage: 'Request body contains invalid workingHours property' };
  }
  
  if (!restaurantId) {
    return { error: true, errorMessage: 'Invalid restaurantId value provided' };
  }

  return null;
}