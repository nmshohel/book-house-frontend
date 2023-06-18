import mongoose, { SortOrder } from "mongoose";
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
import { checkBuyerBudjet, getCowPrice } from "./order.utils";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const buyerInfo = await checkBuyerBudjet(payload);
  const cowInfo = await getCowPrice(payload);
  const buyerLastBudjet = buyerInfo?.budjet?.valueOf();
  const cowPrice = cowInfo?.price?.valueOf();
  if (cowPrice !== undefined && buyerLastBudjet !== undefined) {
    if (buyerLastBudjet < cowPrice) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Not enough budget for buyer");
    }
  }
  const session = await mongoose.startSession();
  let orderData = null;
  try {
    session.startTransaction();
    // ----------------start get cow and update with soldOut
    const cowid = cowInfo?.id;
    const filter = { _id: cowid };
    const update = { label: "sold out" };
    const updateCowLabel = await Cow.updateOne(filter, update, {
      new: true,
    });
    if (!updateCowLabel) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Cow not updated"); // Handle the case when cow is not found
    }
    // ----------------end get cow and update with soldOut-----------------

    // ----------------start update seller income---------------------
    const sellerId = cowInfo?.seller.toString();
    const sellerFilter = { _id: sellerId };
    const seller = await User.findOne(sellerFilter);
    const lastIncome =
      (seller?.income?.valueOf() || 0) + (cowInfo?.price?.valueOf() || 0);
    const sellerUpdate = { income: lastIncome };
    const updateSellerIncome = await User.updateOne(
      sellerFilter,
      sellerUpdate,
      {
        new: true,
      }
    );
    if (!updateSellerIncome) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Seller Income not Updated");
    }

    // ----------------end update seller income------------------------

    // ----------------start update buyer budjet--------------------------
    const buyerId = buyerInfo?.id;
    const buyerFilter = { _id: buyerId };
    const lastBudjet =
      (buyerLastBudjet?.valueOf() || 0) - (cowInfo?.price?.valueOf() || 0);
    const buyerUpdate = { budjet: lastBudjet };

    const updateBuyerBudjet = await User.updateOne(buyerFilter, buyerUpdate, {
      new: true,
    });
    if (!updateBuyerBudjet) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Buyer Budjet Not Updated");
    }
    // ----------------end update buyer budjet----------------------------------
    orderData = await Order.create(payload);
    if (!orderData) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Purchaed failed");
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return orderData;
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
