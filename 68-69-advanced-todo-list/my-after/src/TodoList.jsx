import { useContext } from "react";
import { TodoContext } from "./App";
import { TodoItem } from "./TodoItem";

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useContext(TodoContext);

  return (
    <ul id="list">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            {...todo}
            //toggleTodo={toggleTodo}
            // deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
}
