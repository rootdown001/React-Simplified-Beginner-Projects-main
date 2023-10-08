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
    (initialTodos) => {
      const value = localStorage.getItem(LOCAL_STORAGE_KEY);

      //  console.log(value);
      if (value === "[]") return initialTodos;
      return JSON.parse(value);
    }
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } });
  }

  // function editTodo(todoId) {

  // }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } });
  }

  return (
    <TodoContext.Provider value={{ todos, toggleTodo, deleteTodo, addNewTodo }}>
      <TodoFilterForm />
      <TodoList />
      <NewTodoForm></NewTodoForm>
    </TodoContext.Provider>
  );
}

export default App;
