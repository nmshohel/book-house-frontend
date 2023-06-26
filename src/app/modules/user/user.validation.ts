import { z } from 'zod';
import { role } from './user.constrant';
const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is required ',
    }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    password: z.string({
      required_error: 'Password is required ',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First Name is Required',
      }),
      lastName: z.string({
        required_error: 'Last Name is Required',
      }),
    }),
    address: z.string({
      required_error: 'Address is Required',
    }),
    budjet: z
      .number({
        required_error: 'budjet is Required',
      })
      .optional(),
    income: z
      .number({
        required_error: 'income is Required',
      })
      .optional(),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string({
        required_error: 'Phone Number is required ',
      })
      .optional(),
    role: z
      .enum([...role] as [string, ...string[]], {
        required_error: 'Role is required',
      })
      .optional(),
    password: z
      .string({
        required_error: 'Password is required ',
      })
      .optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First Name is Required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last Name is Required',
          })
          .optional(),
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is Required',
      })
      .optional(),
    budjet: z
      .number({
        required_error: 'budjet is Required',
      })
      .optional(),
    income: z
      .number({
        required_error: 'income is Required',
      })
      .optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
