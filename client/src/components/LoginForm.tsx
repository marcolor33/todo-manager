import { FC, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  DefaultException,
  useAuthControllerGetMeMutation,
  useAuthControllerLoginMutation,
} from '../store/authApi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from './FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../store/hooks';
import { clearAuthentication, setAccessToken, setUser } from '../store/authSlice';

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginFormSchema = z.object({
    email: z
      .string()
      .min(1, 'Email address is required')
      .email('Email Address is invalid'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters'),
  });

  type LoginFormInput = z.TypeOf<typeof loginFormSchema>;

  const methods = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
  });

  const [
    login,
    {
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      error: loginError,
      isError: isLoginError,
      data: loginData,
    },
  ] = useAuthControllerLoginMutation();

  const [
    getMe,
    {
      isLoading: isGetMeLoading,
      isSuccess: isGetMeSuccess,
      error: getMeError,
      isError: isGetMeError,
      data: getMeData,
    },
  ] = useAuthControllerGetMeMutation();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setAccessToken(loginData.accessToken));
      getMe();
    }

    if (isLoginError) {
      if ('status' in loginError) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
          'error' in loginError
            ? loginError.error
            : (loginError.data as DefaultException).message;
        alert(errMsg);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginLoading]);

  useEffect(() => {
    if (isGetMeSuccess) {
      console.log('isGetMeSuccess');
      dispatch(setUser(getMeData));
      navigate('/todos');
    }

    if (isGetMeError) {
      if ('status' in getMeError) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
          'error' in getMeError
            ? getMeError.error
            : (getMeError.data as DefaultException).message;
        console.error(errMsg);
      }
      clearAuthentication()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGetMeLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      // clear the form
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginFormInput> = (values) => {
    console.log('onSubmitHandler called!');
    // 👇 Executing the RegisterUser Mutation
    const { email, password } = values;
    login({ loginDto: { email, password } });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormInput
              variant="outlined"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              variant="outlined"
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isGetMeLoading || isLoginLoading}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default Login;
