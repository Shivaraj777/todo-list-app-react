import React, { useEffect, useState } from 'react'
import styles from '../styles/Todo.module.css';
import {addTask, deleteTask, getTasks, updateTask} from '../api/index';
import TasksIcon from '../images/done.png';
import TodoItem from './TodoItem';
import { toast } from 'react-toastify';

// Todo component
function Todo() {
  const [tasks, setTasks] = useState([]);  //state to store the todo tasks
  const [taskName, setTaskName] = useState('');  //state to store the task name typed in input field
  const [editTaskId, setEditTaskId] = useState('');  //state to store the ID of task to be updated
  const [editMode, setEditMode] = useState(false); //state to switch to update mode
  const [loading, setLoading] = useState(false); //state for providing buffer to add and update tasks

  // fetch tasks from API when component is renederd for first time
  useEffect(() => {
    const getTodoTasks = async () => {
      const response = await getTasks(4);

      // if response is successfull set the tasks state
      if(response.success){
        // console.log(response.data);
        setTasks(response.data);
      }else{
        toast.error('Error in fetching posts');
      }
    }

    getTodoTasks();
  }, [])


  // handle adding a new task to Todo list
  const addTodoTask = async () => {
    setLoading(true);

    if(taskName === ''){
      setLoading(false);
      return toast.error('Task name cannot be null');
    }

    // new task
    const newTask = {
      userId: 1,
      id: (((1+Math.random())*0x10)|0), //Note: due to limitations of API ID can be of only two digits and hence may not be unique all the time
      title: taskName,
      completed: false
    }

    // make API call to add task
    const response = await addTask(newTask);
    
    // if response is successfull add new task to tasks list
    if(response.success){
      setTasks([newTask, ...tasks]);
      toast.success('Task added successfully');
    }else{
      toast.error('Error in adding task');
    }

    setLoading(false);
    setTaskName('');
  }


  //handle deleting a task from list
  const deleteTodoTask = async (taskId) => {
    // make API call to delete task
    const response = await deleteTask(taskId);

    if(response.success){
      // console.log(response.data);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      toast.success('Task deleted successfully');
    }else{
      return toast.error('Error in deleting task');
    }
  }


  // handle switching to edit mode if edit icon is clicked
  const editTask = (taskId) => {
    setEditTaskId(taskId);
    setEditMode(true);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskName(taskToEdit.title); //set the task to be updated in state
  } 


  // handle updating a task from list
  const updateTodoTask = async () => {
    setLoading(true);

    if(taskName === ''){
      setLoading(false);
      return toast.error('Task name cannot be empty');
    }

    //make API call to update a task
    const response = await updateTask(editTaskId, taskName);

    if(response.success){
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId ? { ...task, title: taskName } : task
        )
      );

      toast.success('Task updated successfully');
    }else{
      toast.error('Error in updating task');
    }

    setLoading(false);
    setEditMode(false);
    setTaskName('');
  }


  // handle checkbox change for a task
  const handleTaskCheckboxChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // JSX code
  return (
    <div className={styles.todoContainer}>
      <div className='app-header'>
        <h1>Todo List</h1>
      </div>

      {/* Todo list input container */}
      <div className={styles.createtask}>
        <input 
          type='text' 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          placeholder='Add your task' 
        />
        {!editMode ? 
          <button id={styles.addTask} onClick={addTodoTask}>
            {!loading ? 'Add task' : 'Adding task..'}
          </button> : 
          <button id={styles.updateTask} onClick={updateTodoTask}>
            {!loading ? 'Update task' : 'Updating task..'}
          </button>
        }
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
              key={index} 
              handleDeleteTask={deleteTodoTask} 
              handleEditTask={editTask} 
              handleTaskCheckboxChange={handleTaskCheckboxChange} 
            />
          ))
        }
      </div>
    </div>
  );
}

// export the component
export default Todo;