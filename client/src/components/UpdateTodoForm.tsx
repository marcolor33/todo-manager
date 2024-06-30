import { FC, useEffect } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultException,
  useTodoControllerUpdateMutation,
  Todo,
  TodoStatus,
  useTodoControllerRemoveMutation,
} from '../store/todoApi';
import FormInput from './FormInput';
import FormInputSelect from './FormInputSelect';
import FormInputDatetime from './FormInputDatetime';

interface UpdateTodoFormProps {
  todo: Todo;
  onUpdateComplete: () => void;
  onDeleteComplete: () => void;
}

const UpdateTodoForm: FC<UpdateTodoFormProps> = ({
  todo,
  onUpdateComplete,
  onDeleteComplete,
}) => {
  const [
    updateTodo,
    {
      isLoading: isUpdateTodoLoading,
      isSuccess: isUpdateTodoSuccess,
      error: updateTodoError,
      isError: isUpdateTodoError,
    },
  ] = useTodoControllerUpdateMutation();

  const [
    deleteTodo,
    {
      isLoading: isDeleteTodoLoading,
      isSuccess: isDeleteTodoSuccess,
      error: deleteTodoError,
      isError: isDeleteTodoError,
    },
  ] = useTodoControllerRemoveMutation();

  const updateTodoFormSchema = z.object({
    name: z.string().min(1, 'Todo name is required'),
    description: z.string(),
    dueDate: z.date().nullable(),
    status: z.custom<TodoStatus>(),
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

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

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
    if (isUpdateTodoSuccess) {
      alert('Todo updated successfully!');
      onUpdateComplete();
    }

    if (isUpdateTodoError) {
      if ('status' in updateTodoError) {
        const errMsg =
          'error' in updateTodoError
            ? updateTodoError.error
            : (updateTodoError.data as DefaultException).message;
        alert(errMsg);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateTodoLoading]);

  useEffect(() => {
    if (isDeleteTodoSuccess) {
      alert('Todo deleted successfully!');
      onDeleteComplete();
    }

    if (isDeleteTodoError) {
      if ('status' in deleteTodoError) {
        const errMsg =
          'error' in deleteTodoError
            ? deleteTodoError.error
            : (deleteTodoError.data as DefaultException).message;
        alert(errMsg);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteTodoLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitUpdateHandler: SubmitHandler<UpdateTodoFormInput> = (
    values,
  ) => {
    console.log('onSubmitUpdateHandler called!');
    const { dueDate, ...otherValues } = values;
    const dueDateString = dueDate ? new Date(dueDate).toISOString() : null;
    const updateTodoDto = { dueDate: dueDateString, ...otherValues };
    updateTodo({ id: todo.id, updateTodoDto });
  };

  const onDeleteHandler = () => {
    deleteTodo({ id: todo.id });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitUpdateHandler)}>
        <Grid container spacing={2} alignItems="center" sx={{ py: 1 }}>
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
            <FormInputDatetime label="Due Date" name="dueDate" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormInputSelect
              name="status"
              labelId="status-lable"
              label="Status"
              options={['notStarted', 'inProgress', 'completed']}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" sx={{ gap: 1 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isUpdateTodoLoading}
              >
                Update
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={onDeleteHandler}
                color="error"
                disabled={isDeleteTodoLoading}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default UpdateTodoForm;
