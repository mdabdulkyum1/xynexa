import axios from 'axios'
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
  });

  
const useAxiosSecure = () => {
 
  const router = useRouter();

  axiosInstance.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token');
    config.headers.authorization = token;
    return config;
  }, function (error){
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(function (response){
      return response;
  }, async (error) =>{
    const status = error.response.status;
    if(status === 401 || status === 403){
      await signOut();
      router.push('/sign-in')
    }
    return Promise.reject(error);
  })

    return axiosInstance;
};

export default useAxiosSecure;