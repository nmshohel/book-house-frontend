// import { User } from '../modules/user/user.model';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { User } from '../modules/user/user.model';
import { ILoginUser } from './auth.interface';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';

const loginUser = async (payload: ILoginUser) => {
  const { phoneNumber, password } = payload;

  const user = new User();
  // check user exist
  const isUserExist = await user.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Exist');
  }

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
  } = isUserExist;

  // crete token
  const accessToken = jwtHelpers.createToken(
    { userPhoneNumber, role },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userPhoneNumber, role },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChage,
  };
};

export const AuthService = {
  loginUser,
};
