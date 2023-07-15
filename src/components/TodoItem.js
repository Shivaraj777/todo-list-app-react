import React from 'react';
import styles from '../styles/Todo.module.css';
import DeletIcon from '../images/delete.png';
import EditIcon from '../images/editing.png';

function TodoItem({task}) {
  return (
    <div className={styles.todoItem}>
      <li className={styles.taskInfo}>
        <input type='checkbox' id={task.id} name='Tasks' value={task.title} />
        <label>{task.title}</label>
      </li>
      <div className={styles.taskActions}>
        <img src={EditIcon} alt='edit-icon' height='20px' width='20px' />
        <img src={DeletIcon} alt='delete-icon' height='20px' width='20px' />
      </div>
    </div>
  )
}

export default TodoItem;