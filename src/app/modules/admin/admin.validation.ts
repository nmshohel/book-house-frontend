// import { z } from 'zod';
// import { role } from '../user/user.constrant';
// // import { role } from './user.constrant';
// const createAdminZodSchema = z.object({
//   body: z.object({
//     phoneNumber: z.string({
//       required_error: 'Phone Number is required ',
//     }),
//     role: z.enum([...role] as [string, ...string[]], {
//       required_error: 'Role is required',
//     }),
//     password: z.string({
//       required_error: 'Password is required ',
//     }),
//     name: z.object({
//       firstName: z.string({
//         required_error: 'First Name is Required',
//       }),
//       lastName: z.string({
//         required_error: 'Last Name is Required',
//       }),
//     }),
//     address: z.string({
//       required_error: 'Address is Required',
//     }),
//   }),
// });
// const updateAdminZodSchema = z.object({
//   body: z.object({
//     phoneNumber: z
//       .string({
//         required_error: 'Phone Number is required ',
//       })
//       .optional(),
//     role: z
//       .enum([...role] as [string, ...string[]], {
//         required_error: 'Role is required',
//       })
//       .optional(),
//     password: z
//       .string({
//         required_error: 'Password is required ',
//       })
//       .optional(),
//     name: z
//       .object({
//         firstName: z
//           .string({
//             required_error: 'First Name is Required',
//           })
//           .optional(),
//         lastName: z
//           .string({
//             required_error: 'Last Name is Required',
//           })
//           .optional(),
//       })
//       .optional(),
//     address: z
//       .string({
//         required_error: 'Address is Required',
//       })
//       .optional(),
//   }),
// });

// export const AdminValidation = {
//   createAdminZodSchema,
//   updateAdminZodSchema,
// };
