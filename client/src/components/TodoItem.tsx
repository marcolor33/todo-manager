import { FC } from 'react';
import {
  Typography,
  Grid,
  IconButton,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import { Todo } from '../store/todoApi';
import { Edit } from '@mui/icons-material';
import { format } from 'date-fns';
import TodoStatusChip from './TodoStatusChip';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onUpdate }) => {
  const handleEdit = () => {
    onUpdate(todo);
  };

  return (
    <Card elevation={0} sx={{ my: 1, background: '#F5F5F5' }}>
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={10}>
          <Typography fontSize={20} fontWeight={700} noWrap>
              {todo.name}
            </Typography>
            <Typography  fontStyle="italic" noWrap>
              {todo.dueDate
                ? format(todo.dueDate, 'MM/dd/yyyy')
                : 'no Due Date'}
            </Typography>
            <Typography
                sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
              }}
            >{todo.description}</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
          <Box height={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
          <TodoStatusChip status={todo.status}></TodoStatusChip>
            <IconButton edge="end" onClick={handleEdit}>
              <Edit />
            </IconButton>
          </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
