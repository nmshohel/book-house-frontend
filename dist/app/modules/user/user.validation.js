"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constrant_1 = require("./user.constrant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "Phone Number is required ",
        }),
        role: zod_1.z.enum([...user_constrant_1.role], {
            required_error: "Role is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required ",
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First Name is Required",
            }),
            lastName: zod_1.z.string({
                required_error: "Last Name is Required",
            }),
        }),
        address: zod_1.z.string({
            required_error: "Address is Required",
        }),
        budjet: zod_1.z.number({
            required_error: "budjet is Required",
        }),
        income: zod_1.z.number({
            required_error: "income is Required",
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z
            .string({
            required_error: "Phone Number is required ",
        })
            .optional(),
        role: zod_1.z
            .enum([...user_constrant_1.role], {
            required_error: "Role is required",
        })
            .optional(),
        password: zod_1.z
            .string({
            required_error: "Password is required ",
        })
            .optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z
                .string({
                required_error: "First Name is Required",
            })
                .optional(),
            lastName: zod_1.z
                .string({
                required_error: "Last Name is Required",
            })
                .optional(),
        })
            .optional(),
        address: zod_1.z
            .string({
            required_error: "Address is Required",
        })
            .optional(),
        budjet: zod_1.z
            .number({
            required_error: "budjet is Required",
        })
            .optional(),
        income: zod_1.z
            .number({
            required_error: "income is Required",
        })
            .optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
