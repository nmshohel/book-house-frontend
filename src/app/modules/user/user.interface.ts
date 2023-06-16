import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: UserName;
  address: string;
  budjet: number;
  income: number;
};
export type IUserFilters = {
  searchTerm?: string;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
