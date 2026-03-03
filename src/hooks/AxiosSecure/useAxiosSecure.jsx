import axios from 'axios'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
});

const useAxiosSecure = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const interceptorsSet = useRef(false);

  useEffect(() => {
    // Only set up interceptors once
    if (interceptorsSet.current) return;
    interceptorsSet.current = true;

    // Request interceptor - Add JWT token from session
    const requestInterceptor = axiosInstance.interceptors.request.use(
      function(config) {
        const token = session?.accessToken;
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }, 
      function (error) {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle auth errors
    const responseInterceptor = axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      }, 
      async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          await signOut();
          router.push('/sign-in');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
      interceptorsSet.current = false;
    };
  }, [session, router]);

  return axiosInstance;
};

export default useAxiosSecure;