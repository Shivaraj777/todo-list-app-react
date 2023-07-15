import React, { useEffect, useState } from 'react'
import styles from '../styles/Todo.module.css';
import {getTasks} from '../api/index';
import DeletIcon from '../images/delete.png';
import EditIcon from '../images/editing.png';
import DoneIcon from '../images/done.png';

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
        <input type='text' placeholder='Add your task' />
        <button>Add task</button>
      </div>
      <div className={styles.actions}>
        <div className={styles.completeTasks}>
          <img src={DoneIcon} alt='done-icon' height='30px' width='30px' />
          <span>Complete all tasks</span>
        </div>
        <div className={styles.deleteTasks}>
          <span>Delete tasks</span>
        </div>
      </div>
      <div className={styles.todoItems}>
        {
          tasks.map((task) => (
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
          ))
        }
      </div>
    </div>
  )
}

export default Todo