import { api } from './api';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    todoControllerCreate: build.mutation<
      TodoControllerCreateApiResponse,
      TodoControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/todo`,
        method: 'POST',
        body: queryArg.createTodoDto,
      }),
    }),
    todoControllerQuery: build.query<
      TodoControllerQueryApiResponse,
      TodoControllerQueryApiArg
    >({
      query: (queryArg) => ({
        url: `/todo/query`,
        params: {
          status: queryArg.status,
          dueDate: queryArg.dueDate,
          sortBy: queryArg.sortBy,
          sortOrder: queryArg.sortOrder,
        },
      }),
    }),
    todoControllerFindOneById: build.query<
      TodoControllerFindOneByIdApiResponse,
      TodoControllerFindOneByIdApiArg
    >({
      query: (queryArg) => ({ url: `/todo/${queryArg.id}` }),
    }),
    todoControllerUpdate: build.mutation<
      TodoControllerUpdateApiResponse,
      TodoControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/todo/${queryArg.id}`,
        method: 'PATCH',
        body: queryArg.updateTodoDto,
      }),
    }),
    todoControllerRemove: build.mutation<
      TodoControllerRemoveApiResponse,
      TodoControllerRemoveApiArg
    >({
      query: (queryArg) => ({ url: `/todo/${queryArg.id}`, method: 'DELETE' }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as todoApi };
export type TodoControllerCreateApiResponse =
  /** status 200 Greate a new todo */ Todo;
export type TodoControllerCreateApiArg = {
  createTodoDto: CreateTodoDto;
};
export type TodoControllerQueryApiResponse =
  /** status 200 Query todos */ Todo[];
export type TodoControllerQueryApiArg = {
  status?: 'notStarted' | 'inProgress' | 'completed';
  dueDate?: string;
  sortBy?: string;
  sortOrder?: string;
};
export type TodoControllerFindOneByIdApiResponse =
  /** status 200 get a todo by id */ Todo;
export type TodoControllerFindOneByIdApiArg = {
  id: number;
};
export type TodoControllerUpdateApiResponse =
  /** status 200 update a todo by id */ Todo;
export type TodoControllerUpdateApiArg = {
  id: number;
  updateTodoDto: UpdateTodoDto;
};
export type TodoControllerRemoveApiResponse =
  /** status 201 delete a todo by id */ void;
export type TodoControllerRemoveApiArg = {
  id: number;
};
export type TodoStatus = 'notStarted' | 'inProgress' | 'completed';
export type Todo = {
  id: number;
  userId: number;
  name: string;
  description: string;
  dueDate: string | null;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
export type DefaultException = {
  statusCode: number;
  message: string | string[];
  error: string;
};
export type CreateTodoDto = {
  name: string;
  description?: string;
  dueDate?: string | null;
  status?: TodoStatus;
};
export type UpdateTodoDto = {
  name?: string;
  description?: string;
  dueDate?: string | null;
  status?: TodoStatus;
};
export const {
  useTodoControllerCreateMutation,
  useTodoControllerQueryQuery,
  useTodoControllerFindOneByIdQuery,
  useTodoControllerUpdateMutation,
  useTodoControllerRemoveMutation,
} = injectedRtkApi;
