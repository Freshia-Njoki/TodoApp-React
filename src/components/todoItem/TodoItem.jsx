import { useState, useEffect } from 'react';
import './todoItem.css';

const TodoItem = ({ todo = {}, updateTodo, toggleTodo }) => {
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
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleTodo(todo.id)} 
        className="custom-radio"
      />
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
    </li>
  );
};

export default TodoItem;
