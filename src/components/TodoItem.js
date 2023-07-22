import React from 'react';
import styles from '../styles/TodoItem.module.css';
import DeletIcon from '../images/delete.png';
import EditIcon from '../images/editing.png'

// Todo item component
function TodoItem(props){

  // JSX code
  return (
    <div className={styles.todoItem}>

      {/* Task info */}
      <li className={styles.taskInfo}>
        <input 
          type='checkbox' 
          id={`task-${props.taskId}`} 
          name='Tasks' 
          value={props.task.title} 
          checked={props.task.completed} 
          onChange={() => props.handleTaskCheckboxChange(props.taskId)} 
        />
        <label 
          className={props.task.completed ? styles.isCompleted : styles.toDo} 
          htmlFor={`task-${props.taskId}`}
        >
          {props.task.title}
        </label>
        <span>Status: {props.task.completed ? 'Completed' : 'To Do'}</span>
      </li>

      {/* Task actions */}
      <div className={styles.taskActions}>
        <img 
          src={EditIcon} 
          onClick={() => props.handleEditTask(props.taskId)} 
          alt='edit-icon' 
          height='20px' width='20px' 
        />
        <img 
          src={DeletIcon} 
          onClick={() => props.handleDeleteTask(props.taskId)} 
          alt='delete-icon' 
          height='20px' width='20px' 
        />
      </div>
    </div>
  );
};

// export the component
export default TodoItem;