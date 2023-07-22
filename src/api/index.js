import { API_URLS } from "../utils";

//global fetch function to make api calls
const customFetch =  async (url, {body, ...customConfig}) => {

  const headers = {
    'content-type': 'application/json; charset=UTF-8'
  }

  //define the configuration for fetch function
  const config = {
    ...customConfig,
    ...headers
  }

  //if body exists add it to config
  if(body){
    config.body = body;
  }

  try{
    //get response from api
    const response = await fetch(url, config);
    const data = await response.json();

    //if response is successful return the data
    if(data){
      return {
        data: data,
        success: true
      }
    }
  }catch(error){
    return {
      message: error,
      success: false
    }
  }
}

//API to get the list of tasks
export const getTasks = (limit) => {
  return customFetch(API_URLS.getTasks(limit), {
    method: 'GET'
  });
}

//male API call to add as task
export const addTask = (newTask) => {
  return customFetch(API_URLS.addTask(), {
    method: 'POST',
    body: JSON.stringify(newTask)
  });
}

//make API call to delete a task
export const deleteTask = (taskId) => {
  return customFetch(API_URLS.deleteTask(taskId), {
    method: 'DELETE'
  });
}

//make API call to update a task
export const updateTask = (taskId, taskName) => {
  return customFetch(API_URLS.updateTask(taskId), {
    method: 'PUT',
    body: {
      title: taskName
    }
  });
}