import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export type IOrder = {
  cow: Types.ObjectId | IUser;
  buyer: Types.ObjectId | IUser;
};
export type IOrderFilters = {
  searchTerm?: string;
};
export type OrderModel = Model<IOrder, Record<string, unknown>>;
