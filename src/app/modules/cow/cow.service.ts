import { SortOrder } from 'mongoose';
// import { paginationHelper } from "../../../helpers/paginationsHelper";
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { cowSearchableFields } from './cow.constrant';

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
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginations(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => {
        const regex =
          typeof searchTerm === 'string'
            ? { $regex: searchTerm, $options: 'i' } // for string search
            : { $eq: searchTerm }; // for number search

        return {
          [field]: regex,
        };
      }),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereConditions);

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
