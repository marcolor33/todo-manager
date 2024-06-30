import {
  Todo,
  useTodoControllerQueryQuery,
  TodoControllerQueryApiArg,
  DefaultException,
} from '../store/todoApi';
import CreateTodoForm from '../components/CreateTodoForm';
import Header from '../components/Header';
import UpdateTodoDialog from '../components/UpdateTodoDialog';
import TodoItem from '../components/TodoItem';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import QueryTodoForm from '../components/QueryTodoForm';

export default function TodosPage() {
  const [queryTodofilter, setQueryTodofilter] =
    useState<TodoControllerQueryApiArg>({
      sortBy: 'dueDate',
      sortOrder: 'asc',
    });

  const {
    data: todos,
    isLoading,
    isError,
    error,
    refetch,
  } = useTodoControllerQueryQuery(queryTodofilter);


  useEffect(() => {
    if (isError) {
      if ('status' in error) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg =
          'error' in error
            ? error.error
            : (error.data as DefaultException).message;
        alert(errMsg);
      }
    }
  }, [error, isError]);

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleUpdateTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsUpdateDialogOpen(true);
  };

  useEffect(() => {
    refetch();
  }, [queryTodofilter, refetch]);

  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleUpdateSubmitComplete = () => {
    setIsUpdateDialogOpen(false);
    refetch();
  };
  const handleDeleteSubmitCompleted = () => {
    setIsUpdateDialogOpen(false);
    refetch();
  };

  const handleCreateSubmitComplete = () => {
    refetch();
  };

  const handleFilterChanged = (queryTodofilter: TodoControllerQueryApiArg) => {
    console.log('handleFilterChanged called', queryTodofilter);
    setQueryTodofilter(queryTodofilter);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <Header
        heading="Todo page"
        paragraph=""
        linkName="logout"
        linkUrl="/logout"
      />
      <CreateTodoForm onSubmitComplete={handleCreateSubmitComplete} />

      <QueryTodoForm
        queryTodofilter={queryTodofilter}
        onFilterChanged={handleFilterChanged}
      ></QueryTodoForm>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {(todos || []).map((todo) => (
            <TodoItem key={todo.id} todo={todo} onUpdate={handleUpdateTodo} />
          ))}
          {selectedTodo && (
            <UpdateTodoDialog
              open={isUpdateDialogOpen}
              todo={selectedTodo}
              onUpdateComplete={handleUpdateSubmitComplete}
              onDeleteComplete={handleDeleteSubmitCompleted}
              onClose={handleCloseUpdateDialog}
            />
          )}
        </div>
      )}
    </div>
  );
}
