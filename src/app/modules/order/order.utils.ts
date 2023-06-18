// import { ObjectId } from "mongoose";
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interfac';

export const checkBuyerBudjet = async (payload: IOrder) => {
  const buyerId = payload.buyer;
  const filter2 = { _id: buyerId };
  const buyer = await User.findOne(filter2);
  //   const buyerLastBudjet = buyer?.budjet?.valueOf();
  //   return buyerLastBudjet;
  return buyer;
};

export const getCowPrice = async (payload: IOrder) => {
  const filter = { _id: payload.cow };
  const cow = await Cow.findOne(filter);
  //   const cowPrice = cow?.price?.valueOf();
  //   return cowPrice;
  return cow;
};
