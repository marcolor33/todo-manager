import React from 'react';
import { Chip } from '@mui/material';
import { TodoStatus } from '../store/todoApi';

interface TodoStatusChipProps {
  status: TodoStatus;
}

const TodoStatusChip: React.FC<TodoStatusChipProps> = ({ status }) => {

  if (status === 'notStarted') {
    return <Chip label='Not Started' />
  }
  else if (status === 'inProgress') {
    return <Chip  color='info' label='In Progress' />
  }
  else if (status === 'completed') {
    return <Chip color='success' label='Completed' />
  }
  else {
    return <Chip label={status} />
  }
};

export default TodoStatusChip;
