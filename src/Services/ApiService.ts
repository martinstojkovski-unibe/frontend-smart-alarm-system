const baseURL = process.env.REACT_APP_API_BASE_URL || '';

const user_id = localStorage.getItem('user_id')


const request = async (method: 'GET' | 'POST' | 'PATCH', endpoint: string, body?: unknown) => {
    const url = `${baseURL}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }
  
    return response.json();
  };

  export const postSettings = async(data:{user_age:number,bed_quality:number,ambient_noise:number,preferred_wake_method:number}) =>{
    const responseData = await request('POST','fuzzy/',data);
    localStorage.setItem('user_id',responseData.user_id);
    window.location.reload(); 
    return responseData;
  }

  export const updateSettings = async(data:any) =>{
    if(user_id != null)
     return await request('PATCH',`fuzzy/${user_id}/`,data);
  }

  export const getSettings = async(fields?:string[]) =>{
    if(user_id != null){
      if(fields)
        return await request('GET',`fuzzy/${user_id}/?fields=${fields.filter(s => s).join(',')}`)
      return await request('GET',`fuzzy/${user_id}/`);
    }      
  }

  

