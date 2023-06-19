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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCowPrice = exports.checkBuyerBudjet = void 0;
// import { ObjectId } from "mongoose";
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const checkBuyerBudjet = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const buyerId = payload.buyer;
    const filter2 = { _id: buyerId };
    const buyer = yield user_model_1.User.findOne(filter2);
    //   const buyerLastBudjet = buyer?.budjet?.valueOf();
    //   return buyerLastBudjet;
    return buyer;
});
exports.checkBuyerBudjet = checkBuyerBudjet;
const getCowPrice = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: payload.cow };
    const cow = yield cow_model_1.Cow.findOne(filter);
    //   const cowPrice = cow?.price?.valueOf();
    //   return cowPrice;
    return cow;
});
exports.getCowPrice = getCowPrice;
