import { FC } from 'react';
import UpdateTodoForm from './UpdateTodoForm';
import { Todo } from '../store/todoApi';
import SubmitFormDialog from './SubmitDialog';

interface UpdateTodoDialogProps {
  open: boolean;
  onClose: () => void;
  todo: Todo;
  onUpdateComplete: () => void;
  onDeleteComplete: () => void;
}

const UpdateTodoDialog: FC<UpdateTodoDialogProps> = ({
  open,
  onClose,
  todo,
  onUpdateComplete,
  onDeleteComplete,
}) => {
  return (
    <SubmitFormDialog
      open={open}
      onClose={onClose}
      title={`Update TODO: ${todo.id} ${todo.name}`}
    >
      <UpdateTodoForm
        todo={todo}
        onUpdateComplete={onUpdateComplete}
        onDeleteComplete={onDeleteComplete}
      />
    </SubmitFormDialog>
  );
};

export default UpdateTodoDialog;
