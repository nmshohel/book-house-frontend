// import { User } from '../modules/user/user.model';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { User } from '../modules/user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { phoneNumber, password } = payload;

  const user = new User();
  const isUserExist = await user.isUserExist(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Exist');
  }
};

export const AuthService = {
  loginUser,
};
