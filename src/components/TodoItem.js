import React from 'react';
import styles from '../styles/TodoItem.module.css';
import DeletIcon from '../images/delete.png';
import EditIcon from '../images/editing.png'

// Todo item component
function TodoItem(props){
  const {task, handleTaskCheckboxChange, handleEditTask, handleDeleteTask} = props;

  // JSX code
  return (
    <div className={styles.todoItem}>

      {/* Task info */}
      <li className={styles.taskInfo}>
        <input 
          type='checkbox' 
          id={`task-${task.id}`} 
          name='Tasks' 
          value={task.title} 
          checked={task.completed} 
          onChange={() => handleTaskCheckboxChange(task.id)} 
        />
        <label 
          className={task.completed ? styles.isCompleted : styles.toDo} 
          htmlFor={`task-${task.id}`}
        >
          {task.title}
        </label>
        <span>Status: {task.completed ? 'Completed' : 'To Do'}</span>
      </li>

      {/* Task actions */}
      <div className={styles.taskActions}>
        <img 
          src={EditIcon} 
          onClick={() => handleEditTask(task.id)} 
          alt='edit-icon' 
          height='20px' width='20px' 
        />
        <img 
          src={DeletIcon} 
          onClick={() => handleDeleteTask(task.id)} 
          alt='delete-icon' 
          height='20px' width='20px' 
        />
      </div>
    </div>
  );
};

// export the component
export default TodoItem;