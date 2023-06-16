import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import config from "../../config";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleCastError from "../../errors/handleCastError";
import handleValidationError from "../../errors/hangleValidationError";
import ApiError from "../../errors/ApiError";
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   if (config.env === "development") {
  //     console.log(`🐱‍🏍 globalErrorHandler ~~`, { error });
  //   }
  console.log("this is error-------------------", error);
  let statusCode = 500;
  let message = "Something went wrong !";
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error.name === "CastError") {
    const simpliedError = handleCastError(error);
    statusCode = simpliedError.statusCode;
    message = simpliedError.message;
    errorMessages = simpliedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;

//path:
//message:

// 2025 Fall

// 2025 and
