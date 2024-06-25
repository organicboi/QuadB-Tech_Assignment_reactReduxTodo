import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Load todos from localStorage on initial load
const loadTodosFromLocalStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

// Save todos to localStorage
const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const initialState: Todo[] = loadTodosFromLocalStorage();

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newState = [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
      saveTodosToLocalStorage(newState);
      return newState;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const newState = state.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(newState);
      return newState;
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: number; newText: string }>
    ) => {
      const newState = state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.newText }
          : todo
      );
      saveTodosToLocalStorage(newState);
      return newState;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const newState = state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      saveTodosToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
