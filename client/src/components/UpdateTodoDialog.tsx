import { FC } from 'react';
import UpdateTodoForm from './UpdateTodoForm';
import { Todo } from '../store/todoApi';
import SubmitFormDialog from './SubmitDialog';

interface UpdateTodoDialogProps {
    open: boolean;
    onClose: () => void;
    todo: Todo;
    onSubmitComplete: () => void
}

const UpdateTodoDialog: FC<UpdateTodoDialogProps> = ({ open, onClose, todo, onSubmitComplete }) => {
    return (

        <SubmitFormDialog
            open={open}
            onClose={onClose}
            title={`Update TODO: ${todo.id} ${todo.name}`}
        >
            <UpdateTodoForm todo={todo} onSubmitComplete={onSubmitComplete} />
        </SubmitFormDialog>
    );
};

export default UpdateTodoDialog;