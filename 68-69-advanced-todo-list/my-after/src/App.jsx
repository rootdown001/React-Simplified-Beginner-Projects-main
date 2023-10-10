import { createContext, useEffect, useReducer } from "react";
import "./styles.css";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import TodoFilterForm from "./TodoFilterForm";

export const TodoContext = createContext();

const LOCAL_STORAGE_KEY = "TODOS";

const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

const initialTodos = [
  { name: "Item 1", completed: false, id: crypto.randomUUID() },
  { name: "Item 2", completed: false, id: crypto.randomUUID() },
  { name: "Item 3", completed: false, id: crypto.randomUUID() },
];

// use reducer function instead of useState
function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id)
          return { ...todo, completed: payload.completed };
        return todo;
      });
    case ACTIONS.UPDATE:
      return todos.map((todo) => {
        if (todo.id === payload.id) return { ...todo, name: payload.name };
        return todo;
      });
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id);

    default:
      throw new Error(`No action found for ${type}`);
  }

  return state;
}

function App() {
  const [todos, dispatch] = useReducer(
    reducer,
    initialTodos,
    // add initial function to get from local storage
    (initialTodos) => {
      const value = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (value === "[]") return initialTodos;
      return JSON.parse(value);
    }
  );

  // set in local storage when todos array changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } });
  }

  function updateTodoName(todoId, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id: todoId, name } });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } });
  }

  return (
    <TodoContext.Provider
      value={{ todos, toggleTodo, deleteTodo, addNewTodo, updateTodoName }}
    >
      <TodoFilterForm />
      <TodoList />
      <NewTodoForm></NewTodoForm>
    </TodoContext.Provider>
  );
}

export default App;
