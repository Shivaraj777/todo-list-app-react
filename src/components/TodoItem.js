import React from 'react';
import styles from '../styles/Todo.module.css';
import DeletIcon from '../images/delete.png';
import EditIcon from '../images/editing.png';

function TodoItem({task, taskId, handleDeleteTask, handleEditTask, handleTaskCheckboxChange}) {

  return (
    <div className={styles.todoItem}>
      <li className={styles.taskInfo}>
        <input type='checkbox' id={`task-${taskId}`} name='Tasks' value={task.title} checked={task.completed} onChange={() => handleTaskCheckboxChange(taskId)} />
        <label className={task.completed ? styles.isCompleted : styles.toDo} htmlFor={`task-${taskId}`}>{task.title}</label>
        <span>Status: {task.completed ? 'Completed' : 'To Do'}</span>
      </li>
      <div className={styles.taskActions}>
        <img src={EditIcon} onClick={() => handleEditTask(taskId)} alt='edit-icon' height='20px' width='20px' />
        <img src={DeletIcon} onClick={() => handleDeleteTask(taskId)} alt='delete-icon' height='20px' width='20px' />
      </div>
    </div>
  )
}

export default TodoItem;