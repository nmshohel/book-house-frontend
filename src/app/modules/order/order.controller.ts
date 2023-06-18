import { Request, Response } from 'express';

import httpStatus from 'http-status';

import { OrderService } from './order.service';
import { IOrder } from './order.interfac';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { paginationFileds } from '../../../constants/pagination';
import pick from '../../../shared/pick';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderData } = req.body;
  const result = await OrderService.createOrder(orderData);

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created Successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const paginationOptions = pick(req.query, paginationFileds);
  const result = await OrderService.getAllOrders(filters, paginationOptions);

  sendReponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved Successfull',
    meta: result.meta,
    data: result.data,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
