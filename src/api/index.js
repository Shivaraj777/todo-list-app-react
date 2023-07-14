import { API_URLS, getFormBody } from "../utils";

//global fetch function to make api calls
const customFetch =  async (url, {body, ...customConfig}) => {
  const headers = {
    'content-type': 'application/json; charset=UTF-8'
  }

  //define the configuration for fetch function
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }

  //if body exists add it to config
  if(body){
    config.body = getFormBody(body);
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