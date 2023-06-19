import { Request, Response } from 'express';

import httpStatus from 'http-status';

import { CowService } from './cow.service';
import { ICow } from './cow.interface';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { paginationFileds } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { cowFilterableFields } from './cow.constrant';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.createCow(cowData);

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created Successfully',
    data: result,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);

  sendReponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved Successfull',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);
  sendReponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow Deleteed Successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFileds);

  const result = await CowService.getAllCows(filters, paginationOptions);

  sendReponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await CowService.updateCow(id, updatedData);

  sendReponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow Updated Successfull',
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
