import React, { useEffect, useState } from 'react'
import styles from '../styles/Todo.module.css';
import {addTask, deleteTask, getTasks, updateTask} from '../api/index';
import DoneIcon from '../images/done.png';
import TodoItem from './TodoItem';
import { useToasts } from 'react-toast-notifications';

// Todo component
function Todo() {
  const [tasks, setTasks] = useState([]);  //state to store the todo tasks
  const [taskName, setTaskName] = useState('');  //state to store the task name typed in input field
  const [editTaskId, setEditTaskId] = useState('');  //state to store the ID of task to be updated
  const [editMode, setEditMode] = useState(false); //state to switch to update mode
  const {addToast} = useToasts();  // use react toast notifications

  // fetch tasks from API when component is renederd for first time
  useEffect(() => {
    const getTodoTasks = async () => {
      const response = await getTasks(4);

      // if response is successfull set the tasks state
      if(response.success){
        console.log(response.data);
        setTasks(response.data);
      }
    }

    getTodoTasks();
  }, [])

  // handle adding a new task to Todo list
  const addTodoTask = async () => {
    if(taskName === ''){
      return addToast('Task name cannot be blank', {
        appearance: 'error'
      });
    }

    // make API call to add task
    const response = await addTask(taskName, false);
    
    // if response is successfull add new task to tasks list
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
    // make API call to delete task
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

  // handle switching to edit mode if edit icon is clicked
  const editTask = (taskId) => {
    setEditTaskId(taskId);
    setEditMode(true);
    const taskToEdit = tasks.find((task) => tasks.indexOf(task) === taskId);
    setTaskName(taskToEdit.title); //set the task to be updated in state
  } 

  // handle updating a task from list
  const updateTodoTask = async () => {
    if(taskName === ''){
      return addToast('Task name cannot be blank', {
        appearance: 'error'
      });
    }

    //make API call to update a task
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
        <button id={!editMode ? styles.addTask : styles.updateTask} onClick={!editMode ? addTodoTask : updateTodoTask}>{editMode ? 'Update task' : 'Add Task'}</button>
      </div>
      <div className={styles.headers}>
        <div className={styles.tasksName}>
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
           <TodoItem task={task} taskId={index} key={index} handleDeleteTask={deleteTodoTask} handleEditTask={editTask} handleTaskCheckboxChange={handleTaskCheckboxChange} editMode={editMode}/>
          ))
        }
      </div>
    </div>
  )
}

// export the component
export default Todo;