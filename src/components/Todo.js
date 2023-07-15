import React, { useEffect, useState } from 'react'
import styles from '../styles/Todo.module.css';
import {addTask, getTasks} from '../api/index';
import DoneIcon from '../images/done.png';
import TodoItem from './TodoItem';

let taskId = 201;

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

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


  // handle adding a new task to Todo list
  const addTodoTask = async (e) => {
    // if Enter key is pressed make API call to add task
    if(e.key === 'Enter' || e.target.id === 'add-task'){
      const response = await addTask(1, taskName, false);
      
      // if response is successfull add new task to list
      if(response.success){
        const newTask = {
          userId: 1,
          id: taskId+1,
          title: taskName,
          completed: false
        }
        console.log(newTask);
        setTasks([newTask, ...tasks]);
      }
    }
  }

  return (
    <div className={styles.todoContainer}>
      <div className='app-header'>
        <h1>Todo App</h1>
      </div>
      <div className={styles.createtask}>
        <input type='text' onKeyUp={addTodoTask} value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Add your task' />
        <button id='add-task' onClick={addTodoTask}>Add task</button>
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
          tasks.map((task, index) => (
           <TodoItem task={task} taskId={index} tasks={tasks} setTasks={setTasks} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default Todo