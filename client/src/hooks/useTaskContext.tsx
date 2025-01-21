'use client';

import { TTask } from '@/libs/zod';
import { deleteTask, getTasks, postTasks, putTask } from '@/services/next';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from 'react';
import useAnonyousSignIn from './useAnonymousSignIn';

// Actions for the reducer
const SET_TASKS = 'SET_TASKS';
const CREATE_TASK = 'CREATE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const UNSHIFT_ERRORS = 'UNSHIFT_ERRORS';
const PUSH_ERRORS = 'PUSH_ERRORS';

// Define the state structure
type TTaskContext = {
  tasks?: TTask[];
  errors?: string[];
  isLoading?: boolean;
};

// Define the action types
type Action =
  | { type: typeof SET_TASKS; payload: TTaskContext }
  | { type: typeof CREATE_TASK; payload: TTask }
  | { type: typeof UPDATE_TASK; payload: TTask }
  | { type: typeof DELETE_TASK; payload: number }
  | { type: typeof UNSHIFT_ERRORS; payload: undefined }
  | { type: typeof PUSH_ERRORS; payload: string[] };

// The reducer function
const taskReducer = (state: TTaskContext, action: Action): TTaskContext => {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, ...action.payload };
    case CREATE_TASK:
      return {
        ...state,
        tasks: state.tasks ? [...state.tasks, action.payload] : [action.payload],
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: (state.tasks || []).map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task,
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks ? state.tasks.filter((task) => task.id !== action.payload) : [],
      };
    case UNSHIFT_ERRORS:
      return {
        ...state,
        errors: state.errors ? state.errors.slice(1) : [],
      };
    case PUSH_ERRORS:
      return {
        ...state,
        errors: [...(state.errors || []), `${action.payload}`],
      };
    default:
      return state;
  }
};

type TTaskContextMethods = {
  get?: () => TTaskContext;
  invalidate?: VoidFunction;
  set?: (data: Partial<TTaskContext> | TTask | number) => Promise<void>;
};

// Create the context
const TaskContext = createContext<TTaskContextMethods>({});

const useTaskData = () => {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    errors: [],
    isLoading: false,
  });

  // Async set function
  const set = useCallback(async (data: Partial<TTaskContext> | TTask | number) => {
    const signal = new AbortController().signal;
    if (data && typeof data === 'object') {
      if ('id' in data) {
        // If data is a task object, call the API (PUT)
        const updatedTask = await putTask({ data: data as TTask, signal });
        if (typeof updatedTask === 'string') return dispatch({ type: PUSH_ERRORS, payload: [updatedTask] });
        dispatch({ type: UPDATE_TASK, payload: updatedTask });
      } else if ('errors' in data) {
        if (!Array.isArray(data.errors)) {
          dispatch({ type: UNSHIFT_ERRORS, payload: undefined });
        } else {
          dispatch({ type: PUSH_ERRORS, payload: data.errors });
        }
      } else if ('isLoading' in data) {
        dispatch({ type: SET_TASKS, payload: data as TTaskContext });
      } else {
        // If data is a task object, call the API (POST)
        const newTask = await postTasks({ data: data as TTask, signal });
        if (typeof newTask === 'string') return dispatch({ type: PUSH_ERRORS, payload: [newTask] });
        dispatch({ type: CREATE_TASK, payload: newTask });
      }
    } else if (typeof data === 'number') {
      const deletedTask = await deleteTask({ id: data, signal });
      if (typeof deletedTask === 'string') return dispatch({ type: PUSH_ERRORS, payload: [deletedTask] });
      dispatch({ type: DELETE_TASK, payload: data });
    }
  }, []);

  // Function to invalidate the task query
  const invalidate = useCallback(() => queryClient.invalidateQueries({ queryKey: ['getTasks'] }), [queryClient]);

  return {
    get: () => state,
    invalidate,
    set,
  };
};

type TUseTaskContextReturns = {
  taskContext: TTaskContext;
  setTaskContext: (data: Partial<TTaskContext> | TTask | number) => Promise<void>;
  invalidateTaskContext: VoidFunction;
};

export const useTaskContext = (): TUseTaskContextReturns => {
  const taskContext = useContext(TaskContext);
  if (typeof taskContext !== 'object') throw new Error('useTaskContext must be inside TaskProvider');
  if (typeof taskContext.get !== 'function') throw new Error('taskContext.get must be a function');
  if (typeof taskContext.set !== 'function') throw new Error('taskContext.set must be a function');
  if (typeof taskContext.invalidate !== 'function') throw new Error('taskContext.invalidate must be a function');

  const state = taskContext.get();
  return { taskContext: state, setTaskContext: taskContext.set, invalidateTaskContext: taskContext.invalidate };
};

const useTasks = () => {
  const { status } = useSession();
  const { setTaskContext } = useTaskContext();
  const queryKey = useMemo(() => ['getTasks'], []);
  const queryFn = useCallback(
    async ({ signal }: { signal: AbortSignal }) => {
      const tasks = await getTasks({ signal });
      if (!tasks || !Array.isArray(tasks) || tasks.length === 0) return [];
      setTaskContext({ tasks, isLoading: false });
      return tasks;
    },
    [setTaskContext],
  );

  // Use React Query to execute the task fetch
  const { data: response, isLoading } = useQuery({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false, // Do not refetch on window focus
    retry: 1,
    enabled: status === 'authenticated',
  });

  return {
    data: !isLoading && response ? response : [],
    isLoading,
  };
};

const TaskConsumer = () => {
  useTasks();
  useAnonyousSignIn();
  const {
    taskContext: { errors },
    setTaskContext,
  } = useTaskContext();

  const handleClose = useCallback(() => {
    setTaskContext({ errors: [] });
  }, []);

  return (errors || []).slice(0, 1).map((error) => (
    <button
      key={error}
      onClick={handleClose}
      className='bg-gray-700 text-white p-4 rounded-md fixed bottom-4 right-4 flex justify-between items-center'
    >
      {error}&nbsp;
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-4 h-4'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
      </svg>
    </button>
  ));
};

type TTaskProviderProps = {
  children: ReactNode | ReactNode[];
};

export const TaskProvider = ({ children }: TTaskProviderProps) => {
  return (
    <TaskContext.Provider value={useTaskData()}>
      <>
        {children}
        <TaskConsumer />
      </>
    </TaskContext.Provider>
  );
};

export default useTaskContext;
