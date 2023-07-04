// import { User } from '../modules/user/user.model';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { User } from '../modules/user/user.model';
import {
  ILoginUser,
  IRefreshTokenResponse,
  IUserLoginResponse,
} from './auth.interface';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { phoneNumber, password } = payload;

  const user = new User();
  // check user exist
  const isUserExist = await user.isUserExist(phoneNumber);
  console.log('is user exist', isUserExist?._id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Exist');
  }
  // const userId = 10111;
  // check password matched
  if (isUserExist.password) {
    const passwordMatched = await user.isPasswordMatched(
      password,
      isUserExist.password
    );
    if (!passwordMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password Incorrect');
    }
  }
  const {
    phoneNumber: userPhoneNumber,
    role,
    needsPasswordChage,
    _id, // Include the _id field here
  } = isUserExist;

  // crete token
  const accessToken = jwtHelpers.createToken(
    { userPhoneNumber, role, userId: _id }, // Use _id as userId
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userPhoneNumber, role, userId: _id }, // Use _id as userId
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChage,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
    // console.log(verifyToken);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token');
  }

  const { userPhoneNumber } = verifyToken;
  const user = new User();
  const isUserExist = await user.isUserExist(userPhoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Exist');
  }

  // genereate token
  const newAccessToken = jwtHelpers.createToken(
    {
      userPhoneNumber: isUserExist.phoneNumber,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
