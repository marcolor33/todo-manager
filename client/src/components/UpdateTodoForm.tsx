import { FC, useEffect } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultException, useTodoControllerUpdateMutation, Todo, TodoStatus } from '../store/todoApi';
import FormInput from './FormInput';
import FormInputSelect from './FormInputSelect'
import FormInputDatetime from './FormInputDatetime';

interface UpdateTodoFormProps {
  todo: Todo;
  onSubmitComplete: () => void;
}

const UpdateTodoForm: FC<UpdateTodoFormProps> = ({ todo, onSubmitComplete }) => {
  const [updateTodo, { isLoading, isSuccess, error, isError }] =
    useTodoControllerUpdateMutation();

  const updateTodoFormSchema = z.object({
    name: z.string().min(1, 'Todo name is required'),
    description: z.string(),
    dueDate: z.date().nullable(),
    status: z.custom<TodoStatus>()
  });

  type UpdateTodoFormInput = z.TypeOf<typeof updateTodoFormSchema>;

  const methods = useForm<UpdateTodoFormInput>({
    resolver: zodResolver(updateTodoFormSchema),
    defaultValues: {
      name: todo.name,
      description: todo.description,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
      status: todo.status,
    },
  });

  const { reset, handleSubmit, formState: { isSubmitSuccessful } } = methods;

  useEffect(() => {
    if (todo) {
      reset({
        name: todo.name,
        description: todo.description,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        status: todo.status,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo]);

  useEffect(() => {
    if (isSuccess) {
      alert('Todo updated successfully!');
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

  const onSubmitHandler: SubmitHandler<UpdateTodoFormInput> = (values) => {
    console.log('onSubmitHandler called!');
    const { dueDate, ...otherValues } = values
    const dueDateString = dueDate ? new Date(dueDate).toISOString() : null
    const updateTodoDto = { dueDate: dueDateString, ...otherValues }
    updateTodo({ id: todo.id, updateTodoDto });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormInput
              variant="outlined"
              label="Name"
              id="name"
              name="name"
              required
              placeholder="Todo name"
              fullWidth
            />

          </Grid>
          <Grid item xs={12}>
            <FormInput
              variant="outlined"
              label="Description"
              id="description"
              name="description"
              placeholder="Todo description"
              multiline
              minRows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormInputDatetime
              label="Due Date"
              name="dueDate"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormInputSelect name='status' labelId='status-lable' label="Status" options={['notStarted', 'inProgress', 'completed']} />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default UpdateTodoForm;