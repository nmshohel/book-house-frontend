// import { Schema, model } from 'mongoose';
// // import { IUser, UserModel } from './user.interface';
// // import { role } from './user.constrant';
// import httpStatus from 'http-status';
// import ApiError from '../../../errors/ApiError';
// import { role } from '../user/user.constrant';
// import { AdminModel, IAdmin } from './admin.interface';

// export const AdminSchema = new Schema<IAdmin, AdminModel>(
//   {
//     phoneNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     role: {
//       type: String,
//       enum: role,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     name: {
//       firstName: {
//         type: String,
//         required: true,
//       },
//       lastName: {
//         type: String,
//         required: true,
//       },
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// AdminSchema.pre('save', async function (next) {
//   const isExist = await Admin.findOne({
//     phoneNumber: this.phoneNumber,
//   });
//   if (isExist) {
//     throw new ApiError(httpStatus.CONFLICT, 'PhoneNumber is already exist.');
//   }
//   next();
// });

// export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
