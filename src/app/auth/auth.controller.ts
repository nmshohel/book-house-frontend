import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  //   console.log(loginData);
  const result = await AuthService.loginUser(loginData);
});

export const AuthController = {
  loginUser,
};
