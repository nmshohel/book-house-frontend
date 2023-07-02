import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendReponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  //   console.log(loginData);
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login Successfully',
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
