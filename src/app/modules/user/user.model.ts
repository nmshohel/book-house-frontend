import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import { role } from './user.constrant';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import bcrypt from 'bcrypt';
import config from '../../../config';

export const UserSchema = new Schema<
  IUser,
  Record<string, never>,
  IUserMethods
>(
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
      select: 0, //for don't show pass when create user
    },
    needsPasswordChage: {
      type: Boolean,
      required: true,
      default: true,
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
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// for check phoneNumber exist
UserSchema.pre('save', async function (next) {
  const isExist = await User.findOne({
    phoneNumber: this.phoneNumber,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'PhoneNumber is already exist.');
  }
  next();
});

// for hash password
UserSchema.pre('save', async function (next) {
  this.password = bcrypt.hashSync(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

UserSchema.methods.isUserExist = async function (
  phoneNumber: string
): Promise<Partial<IUser | null>> {
  const user = User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, needsPasswordChage: 1, role: 1 }
  );
  return user;
};

// UserSchema.methods.isUserExist = async function (
//   phoneNumber: string
// ): Promise<Partial<IUser | null>> {
//   const user = await User.findOne({ phoneNumber });
//   return user;
// };

export const User = model<IUser, UserModel>('User', UserSchema);
