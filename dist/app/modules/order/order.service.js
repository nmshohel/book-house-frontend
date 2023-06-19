"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const cow_model_1 = require("../cow/cow.model");
// import { ICow } from "../cow/cow.interface";
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const order_utils_1 = require("./order.utils");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const buyerInfo = yield (0, order_utils_1.checkBuyerBudjet)(payload);
    const cowInfo = yield (0, order_utils_1.getCowPrice)(payload);
    const buyerLastBudjet = (_a = buyerInfo === null || buyerInfo === void 0 ? void 0 : buyerInfo.budjet) === null || _a === void 0 ? void 0 : _a.valueOf();
    const cowPrice = (_b = cowInfo === null || cowInfo === void 0 ? void 0 : cowInfo.price) === null || _b === void 0 ? void 0 : _b.valueOf();
    if (cowPrice !== undefined && buyerLastBudjet !== undefined) {
        if (buyerLastBudjet < cowPrice) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not enough budget for buyer');
        }
    }
    const session = yield mongoose_1.default.startSession();
    let orderData = null;
    try {
        session.startTransaction();
        // ----------------start get cow and update with soldOut
        const cowid = cowInfo === null || cowInfo === void 0 ? void 0 : cowInfo.id;
        const filter = { _id: cowid };
        const update = { label: 'sold out' };
        const updateCowLabel = yield cow_model_1.Cow.updateOne(filter, update, {
            new: true,
        });
        if (!updateCowLabel) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow not updated'); // Handle the case when cow is not found
        }
        // ----------------end get cow and update with soldOut-----------------
        // ----------------start update seller income---------------------
        const sellerId = cowInfo === null || cowInfo === void 0 ? void 0 : cowInfo.seller.toString();
        const sellerFilter = { _id: sellerId };
        const seller = yield user_model_1.User.findOne(sellerFilter);
        const lastIncome = (((_c = seller === null || seller === void 0 ? void 0 : seller.income) === null || _c === void 0 ? void 0 : _c.valueOf()) || 0) + (((_d = cowInfo === null || cowInfo === void 0 ? void 0 : cowInfo.price) === null || _d === void 0 ? void 0 : _d.valueOf()) || 0);
        const sellerUpdate = { income: lastIncome };
        const updateSellerIncome = yield user_model_1.User.updateOne(sellerFilter, sellerUpdate, {
            new: true,
        });
        if (!updateSellerIncome) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Seller Income not Updated');
        }
        // ----------------end update seller income------------------------
        // ----------------start update buyer budjet--------------------------
        const buyerId = buyerInfo === null || buyerInfo === void 0 ? void 0 : buyerInfo.id;
        const buyerFilter = { _id: buyerId };
        const lastBudjet = ((buyerLastBudjet === null || buyerLastBudjet === void 0 ? void 0 : buyerLastBudjet.valueOf()) || 0) - (((_e = cowInfo === null || cowInfo === void 0 ? void 0 : cowInfo.price) === null || _e === void 0 ? void 0 : _e.valueOf()) || 0);
        const buyerUpdate = { budjet: lastBudjet };
        const updateBuyerBudjet = yield user_model_1.User.updateOne(buyerFilter, buyerUpdate, {
            new: true,
        });
        if (!updateBuyerBudjet) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Buyer Budjet Not Updated');
        }
        // ----------------end update buyer budjet----------------------------------
        orderData = yield order_model_1.Order.create(payload);
        if (!orderData) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Purchaed failed');
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return orderData;
});
const getAllOrders = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const cowSearchableFiled = ['name'];
    const { searchTerm } = filters;
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: cowSearchableFiled.map(filed => ({
                [filed]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePaginations(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield order_model_1.Order.find(whereCondition)
        .populate('cow')
        .populate('buyer')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield order_model_1.Order.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
