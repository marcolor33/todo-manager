import { FC, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DefaultException, useAuthControllerRegisterMutation } from '../store/authApi';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from './FormInput';
import { zodResolver } from '@hookform/resolvers/zod';

const RegisterForm: FC = () => {
  const navigate = useNavigate();

  const registerFormSchema = z.object({
    email: z.string()
      .min(1, 'Email address is required')
      .email('Email Address is invalid'),
    password: z.string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

  type RegisterFormInput = z.TypeOf<typeof registerFormSchema>;

  const methods = useForm<RegisterFormInput>({
    resolver: zodResolver(registerFormSchema),
  });


  const [registerUser, { isLoading, isSuccess, error, isError }] =
  useAuthControllerRegisterMutation();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      alert('register success!')
      navigate('/');
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

  const onSubmitHandler: SubmitHandler<RegisterFormInput> = (values) => {
    console.log('onSubmitHandler called!')
    // 👇 Executing the RegisterUser Mutation
    const { email, password } = values
    registerUser({ registerDto: { email, password } });
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
          <FormInput
            variant="outlined"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="confirm-password"
            required
            placeholder="Confirm Password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
    </FormProvider>
  );
};

export default RegisterForm;