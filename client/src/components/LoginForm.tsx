import { FC, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DefaultException, useAuthControllerLoginMutation } from '../store/authApi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from './FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/authSlice';

const Login: FC = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  
  const loginFormSchema = z.object({
    email: z.string()
      .min(1, 'Email address is required')
      .email('Email Address is invalid'),
    password: z.string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters'),
  })

  type LoginFormInput = z.TypeOf<typeof loginFormSchema>;

  const methods = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
  });


  const [loginUser, { isLoading, isSuccess, error, isError, data }] =
    useAuthControllerLoginMutation();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data))
      alert('Login success!')
      navigate('/todos');
    }

    if (isError) {

      if ('status' in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg = 'error' in error ? error.error : (error.data as DefaultException).message
        alert(errMsg)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      // clear the form
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginFormInput> = (values) => {
    console.log('onSubmitHandler called!')
    // 👇 Executing the RegisterUser Mutation
    const { email, password } = values
    loginUser({ loginDto: { email, password } });
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
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
    </FormProvider>
  );
};

export default Login;