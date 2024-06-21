import React from 'react';
import TodoItem from '../todoItem/TodoItem';

const TodoList = ({ todos, updateTodo, deleteTodo, toggleTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          updateTodo={updateTodo} 
          deleteTodo={deleteTodo} 
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
