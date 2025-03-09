const {z} = require('zod');
const {badRequestErrorResponse} = require('../../utils/customResponse');
const {validate} = require('./validationMiddleware')
const registerSchema = z.object({
    firstName:z
    .string()
    .trim()
    .min(3, { message: 'At least 3 char in Name' })
    .max(30, { message: 'At most 30 char in Name' })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z ]*$/;
        return regex.test(value);
      },
      { message: "Name doesn't contain Number and Symbols" }
    ),
    lastName:z
    .string()
    .trim()
    .min(3, { message: 'At least 3 char in Name' })
    .max(30, { message: 'At most 30 char in Name' })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z ]*$/;
        return regex.test(value);
      },
      { message: "Name doesn't contain Number and Symbols" }
    ),
    email: z
    .string()
    .trim()
    .email({ error: 'Invalid Email' })
    .max(50, { message: 'At most 50 char' })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(value);
      },
      { message: "email can't be start with special char and number" }
    ),
    phone: z
    .string()
    .trim()
    .min(10, { message: 'Phone number is not Less than 10' })
    .max(10, { message: 'Phone number is not more than 10' })
    .refine(
      (value) => {
        const regex = /^[1-9]\d{9}$/;
        return regex.test(value);
      },
      {
        message:
          "Phone Number doesn't contain symbol and character",
      }
    )
});

const loginSchema = z.object({
    firstName:z
    .string()
    .trim()
    .min(3, { message: 'At least 3 char in Name' })
    .max(30, { message: 'At most 30 char in Name' })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z ]*$/;
        return regex.test(value);
      },
      { message: "Name doesn't contain Number and Symbols" }
    ),
    password:z.string().min(8, { message: 'At least 6 char in Password' }).max(30, { message: 'At most 30 char in Password' })
});

const updateProfile = z.object({
    firstName:z
    .string()
    .trim()
    .min(3, { message: 'At least 3 char in Name' })
    .max(30, { message: 'At most 30 char in Name' })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z ]*$/;
        return regex.test(value);
      },
      { message: "Name doesn't contain Number and Symbols" }
    ).optional(),
    lastName:z
    .string()
    .trim()
    .min(3, { message: 'At least 3 char in Name' })
    .max(30, { message: 'At most 30 char in Name' })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z ]*$/;
        return regex.test(value);
      },
      { message: "Name doesn't contain Number and Symbols" }
    ).optional(),
    email: z
    .string()
    .trim()
    .email({ error: 'Invalid Email' })
    .max(50, { message: 'At most 50 char' })
    .refine(
      (value) => {
        const regex = /^[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(value);
      },
      { message: "email can't be start with special char and number" }
    ).optional(),
    phone: z
    .string()
    .trim()
    .min(10, { message: 'Phone number is not Less than 10' })
    .max(10, { message: 'Phone number is not more than 10' })
    .refine(
      (value) => {
        const regex = /^[1-9]\d{9}$/;
        return regex.test(value);
      },
      {
        message:
          "Phone Number doesn't contain symbol and character",
      }
    ).optional(),
    bioData:z.string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const wordCount = val.trim().split(/\s+/).length;
        return wordCount <= 500;
      },
      {
        message: "Only 500 words allowed",
      }
    ).optional()
});

const schema = {
    signup : registerSchema,
    login : loginSchema,
    updateProfile : updateProfile
};