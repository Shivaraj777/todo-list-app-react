import React, { useEffect, useState } from 'react'
import styles from '../styles/Todo.module.css';
import {addTask, deleteTask, getTasks, updateTask} from '../api/index';
import DoneIcon from '../images/done.png';
import TodoItem from './TodoItem';
import { useToasts } from 'react-toast-notifications';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [editTaskId, setEditTaskId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const {addToast} = useToasts();

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
    if(taskName === ''){
      return addToast('Task name cannot be blank', {
        appearance: 'error'
      });
    }

    const response = await addTask(1, 201, false);
    
    // if response is successfull add new task to list
    if(response.success){
      const newTask = {
        userId: 1,
        id: 201,
        title: taskName,
        completed: false
      }
      setTasks([newTask, ...tasks]);
      setTaskName('');
      addToast('Task added successfully', {
        appearance: 'success'
      });
    }
  }

  //handle deleting a task from list
  const deleteTodoTask = async (taskId) => {
    const response = await deleteTask(taskId);

    if(response.success){
      // console.log(response.data);
      const updatedTasks = tasks.filter((task) => tasks.indexOf(task) !== taskId);
      setTasks(updatedTasks);
      setTaskName('');
      addToast('Task deleted successfully', {
        appearance: 'success'
      });
    }
  }

  // handle switching to edit mode
  const editTask = (taskId) => {
    setEditTaskId(taskId);
    setEditMode(true);
    const taskToEdit = tasks.find((task) => tasks.indexOf(task) === taskId);
    setTaskName(taskToEdit.title);
  } 

  // handle updating a task from list
  const updateTodoTask = async () => {
    if(taskName === ''){
      return addToast('Task name cannot be blank', {
        appearance: 'error'
      });
    }
    const response = await updateTask(editTaskId, taskName);

    if(response.success){
      const updatedTasks = [];
      for(let i=0; i<tasks.length; i++){
        if(i === editTaskId){
          tasks[i].title = taskName;
        }
        updatedTasks.push(tasks[i]);
      }

      setTasks(updatedTasks);
      setEditMode(false);
      setTaskName('');
      addToast('Task updated successfully', {
        appearance: 'success'
      });
    }
  }

   // handle checkbox change for a task
   const handleTaskCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        prevTasks.indexOf(task) === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className={styles.todoContainer}>
      <div className='app-header'>
        <h1>Todo App</h1>
      </div>
      <div className={styles.createtask}>
        <input type='text' value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder='Add your task' />
        <button id='add-task' onClick={!editMode ? addTodoTask : updateTodoTask}>{editMode ? 'Update task' : 'Add Task'}</button>
      </div>
      <div className={styles.actions}>
        <div className={styles.completeTasks}>
          <img src={DoneIcon} alt='done-icon' height='30px' width='30px' />
          <span>Tasks</span>
        </div>
        <div className={styles.deleteTasks}>
          <span>Actions</span>
        </div>
      </div>
      <div className={tasks.length>4 ? styles.todoItemsScroll : styles.todoItems}>
        {
          tasks.map((task, index) => (
           <TodoItem task={task} taskId={index} key={index} handleDeleteTask={deleteTodoTask} handleEditTask={editTask} handleTaskCheckboxChange={handleTaskCheckboxChange} />
          ))
        }
      </div>
    </div>
  )
}

export default Todo