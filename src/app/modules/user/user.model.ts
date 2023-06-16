import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { role } from "./user.constrant";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

export const UserSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: role,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    budjet: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.pre("save", async function (next) {
  const isExist = await User.findOne({
    phoneNumber: this.phoneNumber,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, "PhoneNumber is already exist.");
  }
  next();
});

export const User = model<IUser, UserModel>("User", UserSchema);
