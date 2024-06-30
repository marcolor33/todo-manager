import { FC } from 'react';
import { Typography, Button, Grid, IconButton, Card, CardContent } from '@mui/material';
import { Todo } from '../store/todoApi';
import { Delete, Edit } from '@mui/icons-material'
import { format } from "date-fns";


interface TodoItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onUpdate: (todo: Todo) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {

  const handleDelete = () => {
    onDelete(todo);
  };

  const handleEdit = () => {
    onUpdate(todo);
  };

  return (
    <Card sx={{ my: 1 }}>
      <CardContent>
        <div>
          <Typography noWrap>Name: {todo.name}</Typography>
          <Typography noWrap>Description: {todo.description}</Typography>
        </div>
        <div>
          <Typography>
            {todo.dueDate ? format(todo.dueDate, "MM/dd/yyyy") : 'no Due Date'}
          </Typography>
          <IconButton edge="end" onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton edge="end" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <Typography variant="body1" style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}>
          {todo.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{todo.dueDate}</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};

export default TodoItem;