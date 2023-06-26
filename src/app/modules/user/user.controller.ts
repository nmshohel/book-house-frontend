import { Request, Response } from 'express';

import httpStatus from 'http-status';
import { IUser } from './user.interface';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendReponse from '../../../shared/sendResponse';
import { paginationFileds } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constrant';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);
  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:
      result.role === 'admin'
        ? 'Admin created Successfully'
        : 'User created Successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendReponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved Successfull',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendReponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleteed Successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFileds);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendReponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await UserService.updateUser(id, updatedData);

  sendReponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated Successfull',
    data: result,
  });
});

export const UserController = {
  createUser,
  getSingleUser,
  updateUser,
  getAllUsers,
  deleteUser,
};
