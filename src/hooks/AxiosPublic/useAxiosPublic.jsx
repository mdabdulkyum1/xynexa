import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
  //  baseURL: 'https://xynexa-server.up.railway.app'
});


const useAxiosPublic = () => {
  return axiosInstance;
};

export default useAxiosPublic;
