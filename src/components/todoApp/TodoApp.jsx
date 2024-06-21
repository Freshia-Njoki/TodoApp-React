import React, { useReducer, useEffect, useState } from 'react';
import TodoList from '../todoList/TodoList';
import TodoForm from '../todoForm/TodoForm';
import ThemeToggle from '../ThemeToggle';
import './todoApp.css';

const initialState = JSON.parse(localStorage.getItem('todos')) || [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'UPDATE':
      return state.map(todo => 
        todo.id === action.payload.id ? action.payload : todo);
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE':
      return state.map(todo => 
        todo.id === action.payload ? {...todo, completed: !todo.completed} : todo);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
    dispatch({ type: 'ADD', payload: { id: Date.now(), text, completed: false } });
  };

  const updateTodo = (id, text) => {
    dispatch({ type: 'UPDATE', payload: { id, text, completed: false } });
  };

  const deleteTodo = id => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const toggleTodo = id => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className="App">
      <header className={darkMode ? 'dark' : ''}>
        <h1>TODO</h1>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <div className={`todo-app ${darkMode ? 'dark' : ''}`}>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
      </div>
    </div>
  );
};

export default TodoApp;
