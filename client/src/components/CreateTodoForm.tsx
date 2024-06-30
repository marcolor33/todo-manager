import React, { useEffect } from 'react';
import { z } from 'zod';
import { Button, Box, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './FormInput';
import {
  DefaultException,
  useTodoControllerCreateMutation,
} from '../store/todoApi';

interface CreateTodoFormProps {
  onSubmitComplete: () => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({
  onSubmitComplete,
}) => {
  const createTodoFormSchema = z.object({
    name: z.string().min(1, 'Todo name is required'),
  });

  type CreateTodoFormInput = z.TypeOf<typeof createTodoFormSchema>;

  const methods = useForm<CreateTodoFormInput>({
    resolver: zodResolver(createTodoFormSchema),
  });

  const [createTodo, { isLoading, isSuccess, error, isError }] =
    useTodoControllerCreateMutation();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      alert('createTodo success!');
      onSubmitComplete();
    }

    if (isError) {
      if ('status' in error) {
        const errMsg =
          'error' in error
            ? error.error
            : (error.data as DefaultException).message;
        alert(errMsg);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<CreateTodoFormInput> = (values) => {
    console.log('onSubmitHandler called!');
    const { name } = values;
    createTodo({ createTodoDto: { name } });
  };

  return (<Box>
    <Typography fontSize={20} fontWeight={700}>
      Create a new task
    </Typography>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FormInput
            variant="outlined"
            label="Name"
            id="email"
            name="name"
            required
            placeholder="Todo name"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Create
          </Button>
        </Box>
      </form>
    </FormProvider>
  </Box>
  );
};

export default CreateTodoForm;
