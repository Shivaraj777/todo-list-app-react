import React, { useEffect, useState } from 'react'
import styles from '../styles/Todo.module.css';
import {addTask, deleteTask, getTasks, updateTask} from '../api/index';
import TasksIcon from '../images/done.png';
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
      }else{
        addToast('Error in fetching tasks', {
          appearance: 'error'
        });
      }
    }

    getTodoTasks();
  }, [addToast])


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
      addToast('Task added successfully', {
        appearance: 'success'
      });
    }else{
      addToast('Error in adding task', {
        appearance: 'error'
      });
    }

    setTaskName('');
  }


  //handle deleting a task from list
  const deleteTodoTask = async (taskId) => {
    // make API call to delete task
    const response = await deleteTask(taskId);

    if(response.success){
      // console.log(response.data);
      const updatedTasks = tasks.filter((task) => tasks.indexOf(task) !== taskId);
      setTasks(updatedTasks);
      addToast('Task deleted successfully', {
        appearance: 'success'
      });
    }else{
      return addToast('Error in deleting task', {
        appearance: 'error'
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
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          prevTasks.indexOf(task) === editTaskId ? { ...task, title: taskName } : task
        )
      );

      addToast('Task updated successfully', {
        appearance: 'success'
      });
    }else{
      addToast('Error in updating task', {
        appearance: 'error'
      });
    }

    setEditMode(false);
    setTaskName('');
  }


  // handle checkbox change for a task
  const handleTaskCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        prevTasks.indexOf(task) === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // JSX code
  return (
    <div className={styles.todoContainer}>
      <div className='app-header'>
        <h1>Todo App</h1>
      </div>

      {/* Todo list input container */}
      <div className={styles.createtask}>
        <input 
          type='text' 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          placeholder='Add your task' 
        />
        <button 
          id={!editMode ? styles.addTask : styles.updateTask} 
          onClick={!editMode ? addTodoTask : updateTodoTask}
        >
          {editMode ? 'Update task' : 'Add Task'}
        </button>
      </div>

      {/* Todo tasks header container */}
      <div className={styles.headers}>
        <div className={styles.tasksName}>
          <img src={TasksIcon} alt='done-icon' height='30px' width='30px' />
          <span>Tasks</span>
        </div>
        <div className={styles.deleteTasks}>
          <span>Actions</span>
        </div>
      </div>

      {/* Todo tasks container */}
      <div className={tasks.length>4 ? styles.todoItemsScroll : styles.todoItems}>
        {
          tasks.map((task, index) => (
            <TodoItem 
              task={task} 
              taskId={index}
              key={index} 
              handleDeleteTask={deleteTodoTask} 
              handleEditTask={editTask} 
              handleTaskCheckboxChange={handleTaskCheckboxChange} 
              editMode={editMode}
            />
          ))
        }
      </div>
    </div>
  )
}

// export the component
export default Todo;