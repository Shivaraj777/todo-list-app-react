import React, { useEffect, useState } from 'react'
import styles from '../styles/Todo.module.css';
import {getTasks} from '../api/index';

function Todo() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTodoTasks = async () => {
      const response = await getTasks(4);

      if(response.success){
        console.log(response.data);
        setTasks(response.data);
      }
    }

    getTodoTasks();
  }, [])

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
        {
          tasks.map((task) => (
            <div className={styles.todoItem}>
              <li>{task.title}</li>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Todo