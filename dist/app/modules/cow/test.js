"use strict";
// this is cow model:
// export const CowSchema = new Schema<ICow, CowModel>(
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       age: {
//         type: Number,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       location: {
//         type: String,
//         enum: location,
//       },
//       breed: {
//         type: String,
//         enum: breed,
//       },
//       weight: {
//         type: Number,
//         required: true,
//       },
//       label: {
//         type: String,
//         enum: label,
//       },
//       category: {
//         type: String,
//         enum: category,
//       },
//       seller: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       },
//     },
//     {
//       timestamps: true,
//       toJSON: {
//         virtuals: true,
//       },
//     }
//   );
//   this is interface
//   export type ICow = {
//     name: string;
//     age: number;
//     price: number;
//     location?:
//       | 'Dhaka'
//       | 'Chattogram'
//       | 'Barishal'
//       | 'Rajshahi'
//       | 'Sylhet'
//       | 'Comilla'
//       | 'Rangpur'
//       | 'Mymensingh';
//     breed:
//       | 'Brahman'
//       | 'Nellore'
//       | 'Sahiwal'
//       | 'Gir'
//       | 'Indigenous'
//       | 'Tharparkar'
//       | 'Kankrej';
//     weight: number;
//     label?: 'for sale' | 'sold out';
//     category?: 'Dairy' | 'Beef' | 'Dual Purpose';
//     seller: Types.ObjectId | IUser;
//   };
//   this is Service
// const getAllCows = async (
//     filters: ICowFilters,
//     paginationOptions: IPaginationOptions
//   ): Promise<IGenericResponse<ICow[]>> => {
//     const { searchTerm, ...filtersData } = filters;
//     const { page, limit, skip, sortBy, sortOrder } =
//       paginationHelper.calculatePaginations(paginationOptions);
//     const andConditions = [];
//     if (searchTerm) {
//         andConditions.push({
//           $or: cowSearchableFields.map(field => {
//             const regex =
//               typeof searchTerm === 'string'
//                 ? { $regex: searchTerm, $options: 'i' } // for string search
//                 : { $eq: searchTerm }; // for number search
//             return {
//               [field]: regex,
//             };
//           }),
//         });
//       }
//     if (Object.keys(filtersData).length) {
//       andConditions.push({
//         $and: Object.entries(filtersData).map(([field, value]) => ({
//           [field]: value,
//         })),
//       });
//     }
//     const sortConditions: { [key: string]: SortOrder } = {};
//     if (sortBy && sortOrder) {
//       sortConditions[sortBy] = sortOrder;
//     }
//     const whereConditions =
//       andConditions.length > 0 ? { $and: andConditions } : {};
//     const result = await Cow.find(whereConditions)
//       .sort(sortConditions)
//       .skip(skip)
//       .limit(limit);
//     const total = await Cow.countDocuments(whereConditions);
//     return {
//       meta: {
//         page,
//         limit,
//         total,
//       },
//       data: result,
//     };
//   };
//   this is controller
//   const getAllCows = catchAsync(async (req: Request, res: Response) => {
//     const filters = pick(req.query, cowFilterableFields);
//     const paginationOptions = pick(req.query, paginationFileds);
//     const result = await CowService.getAllCows(filters, paginationOptions);
//     sendReponse<ICow[]>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Semesters retrieved successfully !',
//       meta: result.meta,
//       data: result.data,
//     });
//   });
//   now when i am serching with searchTerm then give me bellow error
