import Router from 'koa-router';
import Restaurant from '../models/restaurant';
import { WorkingHours } from '../typescript/types';
import Table from '../models/table';
import { validateWorkingHours } from '../helpers/validators';

const restaurantRouter = new Router({ prefix: '/restaurant' });

/**
 * @api {post} /:restaurantId/setWorkingHours Set Restaurant Working Hours
 * @apiName SetWorkingHours
 * @apiGroup Restaurant
 * 
 * @apiHeader {String} Content-Type Application/json
 * 
 * @apiParam {String} restaurantId The ID of the restaurant for which to set the working hours (Required).
 * @apiParam {Object} workingHours The object representing the new working hours (Required).
 * @apiParam {Number} workingHours.start The start time for the restaurant's working hours (Required).
 * @apiParam {Number} workingHours.end The end time for the restaurant's working hours (Required).
 * 
 * @apiSuccess {Object} updatedRestaurant An object containing the result of the update operation, including a count of the number of updated documents.
 * 
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {String} 400.error The error message.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/400 Bad Request
 *     {
 *       "error": "Request body contains invalid workingHours property"
 *     }
 *     OR
 *     {
 *       "error": "Invalid restaurantId value provided"
 *     }
 */
restaurantRouter.post('/:restaurantId/setWorkingHours', async (ctx) => {
  try {
    const { restaurantId } = ctx.params;
    const workingHours = ctx.request.body as WorkingHours;
    
    const validator = validateWorkingHours(restaurantId, workingHours);
    if (validator && validator.error) {
      ctx.status = 400;
      ctx.body = { error: validator.errorMessage };
      return;
    }
  
    const updatedRestaurant = await Restaurant.updateOne({ _id: restaurantId }, { workingHours })
  
    ctx.body = updatedRestaurant;
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
});

restaurantRouter.get('/:restaurantId/tables', async (ctx) => {
  try {
    const tables = await Table.find({ restaurantId: ctx.params.restaurantId });
    ctx.body = tables;
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
  ctx.body = {};
});

export default restaurantRouter;