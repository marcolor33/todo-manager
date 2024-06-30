import { api } from "./api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authControllerRegister: build.mutation<
      AuthControllerRegisterApiResponse,
      AuthControllerRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: "POST",
        body: queryArg.registerDto,
      }),
    }),
    authControllerLogin: build.mutation<
      AuthControllerLoginApiResponse,
      AuthControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.loginDto,
      }),
    }),
    authControllerLogout: build.mutation<
      AuthControllerLogoutApiResponse,
      AuthControllerLogoutApiArg
    >({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as authApi };
export type AuthControllerRegisterApiResponse = /** status 200 register */ User;
export type AuthControllerRegisterApiArg = {
  registerDto: RegisterDto;
};
export type AuthControllerLoginApiResponse = unknown;
export type AuthControllerLoginApiArg = {
  loginDto: LoginDto;
};
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
  useAuthControllerLogoutMutation,
} = injectedRtkApi;
