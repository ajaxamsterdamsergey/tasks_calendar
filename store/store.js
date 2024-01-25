import { configureStore, createSlice } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [] },
  reducers: {
    setTasks: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.tasks = action.payload;
      } else {
        console.error('Action payload is not an array:', action.payload);
      }
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      state.tasks = action.payload.tasks ?? state.tasks;
    });
  }
});

export const { setTasks, addTask, deleteTask } = tasksSlice.actions;

const localStorageMiddleware = store => next => action => {
  let result = next(action);

  if (tasksSlice.actions.setTasks.match(action) || 
      tasksSlice.actions.addTask.match(action) || 
      tasksSlice.actions.deleteTask.match(action)) {
    if (typeof window !== 'undefined') {
      const state = store.getState();
      localStorage.setItem('tasks', JSON.stringify(state.tasks.tasks));
    }
  }
  
  return result;
};

const makeStore = () => configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(localStorageMiddleware),
});

export const wrapper = createWrapper(makeStore);