import Router from 'koa-router';
import Table from '../models/table';

const tableRouter = new Router({ prefix: '/table' });

/**
 * @api {post} /table/ Create New Table
 * @apiName CreateTable
 * @apiGroup Table
 *
 * @apiHeader {String} Content-Type Application/json
 *
 * @apiParam {Object} request.body The request body object containing the necessary data (Required).
 * @apiParam {String} request.body.restaurantId The ID of the restaurant for which to create a new table (Required).
 *
 * @apiSuccess {Object} table The newly created table object.
 * 
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {String} 400.error The error message.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/400 Bad Request
 *     {
 *       "error": "Bad Request",
 *       "message": "No restaurantId provided"
 *     }
 */
tableRouter.post('/', async (ctx) => {
  try {
    const { restaurantId } = ctx.request.body as { restaurantId: string };
  
    if (!restaurantId) {
      ctx.status = 400;
      ctx.body = { error: 'Bad Request', message: 'No restaurantId provided' };
      return;
    }
  
    const numberOfTables = await Table.countDocuments({ restaurantId });
  
    ctx.body = await Table.create({ restaurantId, tableNumber: numberOfTables + 1 });
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
});

/**
 * @api {get} /table/ Get All Tables for a Restaurant
 * @apiName GetTables
 * @apiGroup Table
 *
 * @apiHeader {String} Content-Type Application/json
 *
 * @apiParam {String} query.restaurantId The ID of the restaurant to get all tables for (Required, in URL query).
 * 
 * @apiSuccess {Array} tables An array of table objects.
 * 
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {String} 400.error The error message.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/400 Bad Request
 *     {
 *       "error": "Bad Request",
 *       "message": "No restaurantId provided"
 *     }
 */
tableRouter.get('/', async (ctx) => {
  try {
    const restaurantId = ctx.query.restaurantId;
    if (!restaurantId) {
      ctx.status = 400;
      ctx.body = { error: 'Bad Request', message: 'No restaurantId provided' };
      return;
    }
    
    const tables = await Table.find({ restaurantId });
    ctx.body = tables;
  } catch (error) {
    ctx.body = JSON.stringify(error);
  }
});

export default tableRouter;