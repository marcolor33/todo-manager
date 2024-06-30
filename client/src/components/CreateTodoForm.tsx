import React, { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormInput from './FormInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultException, useTodoControllerCreateMutation } from '../store/todoApi';

interface CreateTodoFormProps {
  onSubmitComplete: () => void;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onSubmitComplete }) => {
  const createTodoFormSchema = z.object({
    name: z.string().min(1, 'Todo name is required'),
  });

  type CreateTodoFormInput = z.TypeOf<typeof createTodoFormSchema>;

  const methods = useForm<CreateTodoFormInput>({
    resolver: zodResolver(createTodoFormSchema),
  });

  const [createTodo, { isLoading, isSuccess, error, isError }] =
    useTodoControllerCreateMutation();

  const { reset, handleSubmit, formState: { isSubmitSuccessful } } = methods;

  useEffect(() => {
    if (isSuccess) {
      alert('createTodo success!');
      onSubmitComplete()
    }

    if (isError) {
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : (error.data as DefaultException).message;
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Box sx={{ display: 'flex' }}>
          <FormInput
            variant="outlined"
            label="Name"
            id="email"
            name="name"
            required
            placeholder="Todo name"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
            Create
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default CreateTodoForm;