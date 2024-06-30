import { api } from './api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authControllerRegister: build.mutation<
      AuthControllerRegisterApiResponse,
      AuthControllerRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: 'POST',
        body: queryArg.registerDto,
      }),
    }),
    authControllerLogin: build.mutation<
      AuthControllerLoginApiResponse,
      AuthControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: 'POST',
        body: queryArg.loginDto,
      }),
    }),
    authControllerGetMe: build.mutation<
      AuthControllerGetMeApiResponse,
      AuthControllerGetMeApiArg
    >({
      query: () => ({ url: `/auth/getMe`, method: 'POST' }),
    }),
    authControllerLogout: build.mutation<
      AuthControllerLogoutApiResponse,
      AuthControllerLogoutApiArg
    >({
      query: () => ({ url: `/auth/logout`, method: 'POST' }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as authApi };
export type AuthControllerRegisterApiResponse = /** status 200 register */ User;
export type AuthControllerRegisterApiArg = {
  registerDto: RegisterDto;
};
export type AuthControllerLoginApiResponse =
  /** status 200 Login */ LoginResponseDto;
export type AuthControllerLoginApiArg = {
  loginDto: LoginDto;
};
export type AuthControllerGetMeApiResponse = /** status 200 getMe */ User;
export type AuthControllerGetMeApiArg = void;
export type AuthControllerLogoutApiResponse = unknown;
export type AuthControllerLogoutApiArg = void;
export type User = {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
export type DefaultException = {
  statusCode: number;
  message: string | string[];
  error: string;
};
export type RegisterDto = {
  email: string;
  password: string;
};
export type LoginResponseDto = {
  accessToken: string;
};
export type LoginDto = {
  email: string;
  password: string;
};
export const {
  useAuthControllerRegisterMutation,
  useAuthControllerLoginMutation,
  useAuthControllerGetMeMutation,
  useAuthControllerLogoutMutation,
} = injectedRtkApi;
