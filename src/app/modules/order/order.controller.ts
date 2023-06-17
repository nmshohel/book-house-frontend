import { Request, Response } from "express";
import catchAsync from "../../Shared/catchAsync";
import sendResponse from "../../Shared/sendResponse";
import httpStatus from "http-status";
import { paginationFileds } from "../../../constant/pagination";
import pick from "../../Shared/pick";
import { OrderService } from "./order.service";
import { IOrder } from "./order.interfac";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderData } = req.body;
  const result = await OrderService.createOrder(orderData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created Successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm"]);
  const paginationOptions = pick(req.query, paginationFileds);
  const result = await OrderService.getAllOrders(filters, paginationOptions);

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow retrieved Successfull",
    meta: result.meta,
    data: result.data,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
