import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";

// export type location = [
//   | "Dhaka"
//   | "Chattogram"
//   | "Barishal"
//   | "Rajshahi"
//   | "Sylhet"
//   | "Comilla"
//   | "Rangpur"
//   | "Mymensingh"
// ];
// export type breed = [
//   | "Brahman"
//   | "Nellore"
//   | "Sahiwal"
//   | "Gir"
//   | "Indigenous"
//   | "Tharparkar"
//   | "Kankrej"
// ];
// export type label = [];
// export type category = ["Dairy" | "Beef" | "Dual Purpose"];
export type ICow = {
  name: String;
  age: Number;
  price: Number;
  location?:
    | "Dhaka"
    | "Chattogram"
    | "Barishal"
    | "Rajshahi"
    | "Sylhet"
    | "Comilla"
    | "Rangpur"
    | "Mymensingh";
  breed:
    | "Brahman"
    | "Nellore"
    | "Sahiwal"
    | "Gir"
    | "Indigenous"
    | "Tharparkar"
    | "Kankrej";
  weight: Number;
  label?: "for sale" | "sold out";
  category?: "Dairy" | "Beef" | "Dual Purpose";
  seller: Types.ObjectId | IUser;
};
export type ICowFilters = {
  searchTerm?: string;
};
export type CowModel = Model<ICow, Record<string, unknown>>;
