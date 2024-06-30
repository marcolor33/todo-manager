import { FC } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { TodoControllerQueryApiArg } from '../store/todoApi';

enum StatusFilter {
  notStarted = 'notStarted',
  inProgress = 'inProgress',
  completed = 'completed',
}

enum SortBy {
  name = 'name',
  dueDate = 'dueDate',
}
enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}



type QueryTodoFormProps = {
  queryTodofilter: TodoControllerQueryApiArg
  onFilterChanged: (newQueryTodofilter: TodoControllerQueryApiArg) => void
}

const QueryTodoForm: FC<QueryTodoFormProps> = ({ queryTodofilter, onFilterChanged }) => {

  const handleStatusFilterChange = (value: StatusFilter) => {
    console.log('value', value)
    const newQueryTodofilter = {
      ...queryTodofilter,
      status: value || undefined, 
    }
    onFilterChanged(newQueryTodofilter);
  };

  const handleSortByFilterChange = (value: SortBy) => {
    const newQueryTodofilter: TodoControllerQueryApiArg = {
      ...queryTodofilter,
      sortBy: value,
    }
    onFilterChanged(newQueryTodofilter);
  };

  const handleSortOrderFilterChange = (value: SortOrder) => {
    const newQueryTodofilter: TodoControllerQueryApiArg = {
      ...queryTodofilter,
      sortOrder: value,
    }
    onFilterChanged(newQueryTodofilter);
  };


  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel id="status-filter-label">Status Filter</InputLabel>
        <Select
          labelId='status-filter-label'
          value={queryTodofilter.status || ''}
          onChange={(e) => handleStatusFilterChange(e.target.value as StatusFilter)}
          fullWidth
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="notStarted">Not Started</MenuItem>
          <MenuItem value="inProgress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id='sort-by-filter-label'>Sort By</InputLabel>
          <Select
            value={queryTodofilter.sortBy}
            onChange={(e) => handleSortByFilterChange(e.target.value as SortBy)}
            labelId='sort-by-filter-label'
          >
            <MenuItem value="name">Title</MenuItem>
            <MenuItem value="dueDate">Due Date</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel id="sort-order-filter-label">Sort Order</InputLabel>
        <Select
          labelId='sort-order-filter-label'
          value={queryTodofilter.sortOrder}
          onChange={(e) => handleSortOrderFilterChange(e.target.value as SortOrder)}
          fullWidth
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>

      </Grid>
    </Grid>
  );
};

export default QueryTodoForm;