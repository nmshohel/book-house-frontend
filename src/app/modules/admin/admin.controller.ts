// import { Request, Response } from 'express';

// import httpStatus from 'http-status';

// import catchAsync from '../../../shared/catchAsync';

// import sendReponse from '../../../shared/sendResponse';
// import { paginationFileds } from '../../../constants/pagination';
// import pick from '../../../shared/pick';
// import { IAdmin } from './admin.interface';

// const createAdmin = catchAsync(async (req: Request, res: Response) => {
//   const { ...userData } = req.body;
//   const result = await AdminService.createAdmin(userData);

//   sendReponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin created Successfully',
//     data: result,
//   });
// });

// const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await AdminService.getSingleAdmin(id);

//   sendReponse<IAdmin>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin retrieved Successfull',
//     data: result,
//   });
// });

// const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = await AdminService.deleteAdmin(id);
//   sendReponse<IAdmin>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin Deleteed Successfully',
//     data: result,
//   });
// });

// const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, userFilterableFields);
//   const paginationOptions = pick(req.query, paginationFileds);

//   const result = await AdminService.getAllAdmins(filters, paginationOptions);

//   sendReponse<IAdmin[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admins retrieved successfully !',
//     meta: result.meta,
//     data: result.data,
//   });
// });

// const updateAdmin = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const updatedData = req.body;
//   const result = await AdminService.updateAdmin(id, updatedData);

//   sendReponse<IAdmin>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Admin Updated Successfull',
//     data: result,
//   });
// });

// export const AdminController = {
//   createAdmin,
//   getSingleAdmin,
//   updateAdmin,
//   getAllAdmins,
//   deleteAdmin,
// };
