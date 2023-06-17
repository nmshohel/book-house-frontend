import { Request, Response } from "express";
import catchAsync from "../../Shared/catchAsync";
import sendResponse from "../../Shared/sendResponse";
import httpStatus from "http-status";
import { paginationFileds } from "../../../constant/pagination";
import pick from "../../Shared/pick";
import { CowService } from "./cow.service";
import { ICow } from "./cow.interface";

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.createCow(cowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow created Successfully",
    data: result,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow retrieved Successfull",
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow Deleteed Successfully",
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm"]);
  const paginationOptions = pick(req.query, paginationFileds);
  const result = await CowService.getAllCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow retrieved Successfull",
    meta: result.meta,
    data: result.data,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await CowService.updateCow(id, updatedData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow Updated Successfull",
    data: result,
  });
});

export const CowController = {
  createCow,
  getSingleCow,
  updateCow,
  getAllCows,
  deleteCow,
};
