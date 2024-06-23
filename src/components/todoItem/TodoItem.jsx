import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import './todoItem.css'

const TodoItem = ({ todo = {}, updateTodo, deleteTodo, toggleTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text || '');

  useEffect(() => {
    setText(todo.text || '');
  }, [todo.text]);

  const handleUpdate = () => {
    updateTodo(todo.id, text);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input 
          type="text" 
          value={text} 
          onChange={e => setText(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={e => e.key === 'Enter' && handleUpdate()}
        />
      ) : (
        <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
      )}
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => deleteTodo(todo.id)}><FaTrash /></button>
    </li>
  );
};

export default TodoItem;
