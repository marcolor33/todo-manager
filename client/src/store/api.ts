// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from './todoApi';

// initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${import.meta.env.API_ENDPOINT}`,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: {
    useAuthControllerLoginMutation: {
      providesTags: ['Auth'],
    },

    useTodoControllerQueryQuery: {
      providesTags: ['Todo'],
    },
    todoControllerCreate: {
      invalidatesTags: (result: Todo) => [{ type: 'Todo', id: result.id }],
    },
    todoControllerUpdate: {
      invalidatesTags: (
        _result: Todo,
        _error: unknown,
        arg: { id: number },
      ) => [{ type: 'Todo', id: arg.id }],
    },
    useTodoControllerRemoveMutation: {
      invalidatesTags: (
        _result: Todo,
        _error: unknown,
        arg: { id: number },
      ) => [{ type: 'Todo', id: arg.id }],
    },
  },
});
