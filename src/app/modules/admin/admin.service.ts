// import { SortOrder } from 'mongoose';
// // import { IUser, IUserFilters } from './user.interface';
// // import { User } from './user.model';
// // import { paginationHelper } from "../../../helpers/paginationsHelper";
// import { IPaginationOptions } from '../../../interfaces/pagination';
// import { IGenericResponse } from '../../../interfaces/common';
// import { paginationHelper } from '../../../helpers/paginationHelper';
// // import { userSearchableFields } from './user.constrant';
// import { Admin } from './admin.model';
// import { IAdmin, IAdminFilters } from './admin.interface';

// const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
//   const result = await Admin.create(payload);
//   return result;
// };

// // get single User service
// const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
//   const result = await User.findById(id);
//   return result;
// };

// // delete User service
// const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
//   const result = await User.findByIdAndDelete(id);
//   return result;
// };

// const getAllAdmins = async (
//   filters: IAdminFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<IAdmin[]>> => {
//   const { searchTerm, ...filtersData } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelper.calculatePaginations(paginationOptions);

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       $or: userSearchableFields.map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filtersData).length) {
//     andConditions.push({
//       $and: Object.entries(filtersData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   const sortConditions: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortConditions[sortBy] = sortOrder;
//   }
//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await User.find(whereConditions)
//     .sort(sortConditions)
//     .skip(skip)
//     .limit(limit);

//   const total = await User.countDocuments(whereConditions);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

// // update User service
// const updateAdmin = async (
//   id: string,
//   payload: Partial<IUser>
// ): Promise<IUser | null> => {
//   const result = await User.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   });
//   return result;
// };
// export const AdminService = {
//   createAdmin,
//   getSingleAdmin,
//   updateAdmin,
//   getAllAdmins,
//   deleteAdmin,
// };
