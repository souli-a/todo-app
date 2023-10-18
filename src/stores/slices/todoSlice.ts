import { createSlice, nanoid } from '@reduxjs/toolkit';

interface InitialState {
  id: string;
  description: string;
  isDone: boolean;
}

const initialState: InitialState[] = [];

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        description: action.payload,
        isDone: false,
      };
      state.unshift(newTodo);
    },
    deleteTodo: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateTodoStatus: (state, action) => {
      const todo = state.find((item) => item.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    updateTodoItemsOrder: (_, action) => {
      const newArr = action.payload;
      return newArr;
    },
    updateTodoDescription: (state, action) => {
      const todo = state.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.description = action.payload.description;
      }
    },
    deleteTodoCompleted: (state) => {
      return state.filter((item) => item.isDone === false);
    },
    deleteAllTodo: (state) => {
      state.length = 0;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodoStatus,
  updateTodoItemsOrder,
  updateTodoDescription,
  deleteTodoCompleted,
  deleteAllTodo,
} = todoSlice.actions;
export { type InitialState };
export default todoSlice.reducer;
