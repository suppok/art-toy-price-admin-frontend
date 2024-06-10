import React from 'react';

function TodoItem({ task, deleteTask, toggleCompleted }) {
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <div className="todo-item">
      <input type="checkbox" checked={task.completed} onChange={handleChange} />
      {task.completed ? <s>{task.text}</s> : <div>{task.text}</div>}
      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
}
export default TodoItem;
