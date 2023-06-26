import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer' | 'admin';
  password: string;
  needsPasswordChage: boolean;
  name: UserName;
  address: string;
  budjet?: number;
  income?: number;
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
