import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  _id: string;
  phoneNumber: string;
  role: 'seller' | 'buyer' | 'admin';
  password: string;
  needsPasswordChage: boolean;
  name: UserName;
  address: string;
  budjet?: number;
  income?: number;
  userId?: string | null;
};
export type IUserFilters = {
  searchTerm?: string;
  phoneNumber?: string;
  role?: string;
  address?: string;
};

export type IUserMethods = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser | null>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
