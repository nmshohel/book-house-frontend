import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationsHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { ICow, ICowFilters } from "./cow.interface";
import { Cow } from "./cow.model";

const createCow = async (payload: ICow): Promise<ICow> => {
  const result = await Cow.create(payload);
  return result;
};

// get single cow service
const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id);
  return result;
};

// delete cow service
const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
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
  const result = await Cow.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// update cow service
const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const CowService = {
  createCow,
  getSingleCow,
  updateCow,
  getAllCows,
  deleteCow,
};
