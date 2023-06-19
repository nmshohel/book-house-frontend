"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constrant_1 = require("./cow.constrant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name Number is required ",
        }),
        age: zod_1.z.number({
            required_error: "Age Number is required ",
        }),
        price: zod_1.z.number({
            required_error: "Price Number is required ",
        }),
        location: zod_1.z.enum([...cow_constrant_1.location], {
            required_error: "location is required",
        }),
        breed: zod_1.z.enum([...cow_constrant_1.breed], {
            required_error: "breed is required",
        }),
        weight: zod_1.z.number({
            required_error: "weight is required ",
        }),
        label: zod_1.z.enum([...cow_constrant_1.label], {
            required_error: "label is required",
        }),
        category: zod_1.z.enum([...cow_constrant_1.category], {
            required_error: "category is required",
        }),
        seller: zod_1.z.string({
            required_error: "seller is Required",
        }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name Number is required ",
        })
            .optional(),
        age: zod_1.z
            .number({
            required_error: "Age Number is required ",
        })
            .optional(),
        price: zod_1.z
            .number({
            required_error: "Price Number is required ",
        })
            .optional(),
        location: zod_1.z
            .enum([...cow_constrant_1.location], {
            required_error: "location is required",
        })
            .optional(),
        breed: zod_1.z
            .enum([...cow_constrant_1.breed], {
            required_error: "breed is required",
        })
            .optional(),
        weight: zod_1.z
            .number({
            required_error: "weight is required ",
        })
            .optional(),
        label: zod_1.z
            .enum([...cow_constrant_1.label], {
            required_error: "label is required",
        })
            .optional(),
        category: zod_1.z
            .enum([...cow_constrant_1.category], {
            required_error: "category is required",
        })
            .optional(),
        seller: zod_1.z
            .string({
            required_error: "seller is Required",
        })
            .optional(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
