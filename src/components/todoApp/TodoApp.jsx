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
    case 'TOGGLE':
      return state.map(todo => 
        todo.id === action.payload ? {...todo, completed: !todo.completed} : todo);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
    dispatch({ type: 'ADD', payload: { id: Date.now(), text, completed: false } });
  };

  const updateTodo = (id, text) => {
    dispatch({ type: 'UPDATE', payload: { id, text } });
  };

  const toggleTodo = id => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="App">
      <div className="top-image" />
      <header className={darkMode ? 'dark' : ''}>
        <h1>TODO</h1>
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <div className={`todo-app ${darkMode ? 'dark' : ''}`}>
        <TodoForm addTodo={addTodo} />
        <TodoList 
          todos={filteredTodos} 
          updateTodo={updateTodo} 
          toggleTodo={toggleTodo} 
        />
        <div className="controls">
          <span>{todos.filter(todo => !todo.completed).length} items left</span>
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
