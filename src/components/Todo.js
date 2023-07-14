import React from 'react'
import styles from '../styles/Todo.module.css';

function Todo() {
  return (
    <div className={styles.todoContainer}>
      <div className='app-header'>
        <h1>Todo App</h1>
      </div>
      <div className={styles.createtask}>
        <input type='text' />
        <button>Add task</button>
      </div>
      <div className={styles.action}>
        <span>Complete all tasks  </span>
        <span>  Delete tasks</span>
      </div>
      <div className={styles.todoItems}>

      </div>
    </div>
  )
}

export default Todo