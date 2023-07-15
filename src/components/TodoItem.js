import React from 'react';
import styles from '../styles/Todo.module.css';
import DeletIcon from '../images/delete.png';
import EditIcon from '../images/editing.png';
import { deleteTask } from '../api';
import { useToasts } from 'react-toast-notifications';

function TodoItem({task, tasks, setTasks, taskId}) {
  const {addToast} = useToasts();

  //handle deletig a task from list
  const deleteTodoTask = async (taskId) => {
    const response = await deleteTask(taskId);

    if(response.success){
      // console.log(response.data);
      const updatedTasks = tasks.filter((task) => tasks.indexOf(task) !== taskId);
      setTasks(updatedTasks);
      addToast('Task deleted successfully', {
        appearance: 'success'
      });
    }
  }

  return (
    <div className={styles.todoItem}>
      <li className={styles.taskInfo}>
        <input type='checkbox' id={task.id} name='Tasks' value={task.title} />
        <label>{task.title}</label>
      </li>
      <div className={styles.taskActions}>
        <img src={EditIcon} alt='edit-icon' height='20px' width='20px' />
        <img src={DeletIcon} onClick={() => deleteTodoTask(taskId)} alt='delete-icon' height='20px' width='20px' />
      </div>
    </div>
  )
}

export default TodoItem;