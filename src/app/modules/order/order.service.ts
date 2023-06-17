import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationsHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";

import { Order } from "./order.model";
import { IOrder, IOrderFilters } from "./order.interfac";
import { Cow } from "../cow/cow.model";
import { ICow } from "../cow/cow.interface";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  // ----------------start get cow and update with soldOut
  console.log(payload);
  const cowid = payload.cow;
  const filter = { _id: cowid };
  const update = { label: "sold out" };
  const updateCow = await Cow.findOneAndUpdate(filter, update, { new: true });

  if (!updateCow) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cow not updated"); // Handle the case when cow is not found
  }
  // ----------------end get cow and update with soldOut

  // ----------------start update seller income
  const sellerId = updateCow.seller.toString();
  const filter1 = { _id: sellerId };
  const seller = await User.findOne(filter1);
  const lastIncome =
    (seller?.income?.valueOf() || 0) + (updateCow?.price?.valueOf() || 0);
  const update1 = { income: lastIncome };
  const updateSellerIncome = await User.updateOne(filter1, update1, {
    new: true,
  });
  // ----------------end update seller income

  // ----------------start update buyer budjet
  const buyerId = payload.buyer;
  const filter2 = { _id: buyerId };
  const buyer = await User.findOne(filter2);
  const lastBudjet =
    (buyer?.budjet?.valueOf() || 0) - (updateCow?.price?.valueOf() || 0);
  if (lastBudjet < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Not enough budjet");
  }
  const update2 = { budjet: lastBudjet };
  const updateBuyerBudjet = await User.updateOne(filter2, update2, {
    new: true,
  });
  // ----------------end update buyer budjet

  const result = await Order.create(payload);
  return result;
};

const getAllOrders = async (
  filters: IOrderFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IOrder[]>> => {
  const cowSearchableFiled = ["name"];
  const { searchTerm } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: cowSearchableFiled.map((filed) => ({
        [filed]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginations(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Order.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Order.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
