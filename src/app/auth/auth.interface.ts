export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
export type IUserLoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChage: boolean | undefined;
};
