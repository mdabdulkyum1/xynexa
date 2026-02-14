import useUserStore from '@/store/useUserStore';
import { useSession } from "next-auth/react";
import React, { useEffect } from 'react';

const SyncUser = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (status === "authenticated" && session?.user) {
          // Sync user to Zustand store
          useUserStore.setState({
            user: {
              user: {
                username: session.user.name || session.user.email.split('@')[0],
                email: session.user.email,
                photo: session.user.image,
                role: session.user.role,
                id: session.user.id,
                _id: session.user.id
              }
            }
          });

          // Sync token to localStorage for Axios
          if (session.accessToken) {
            localStorage.setItem('token', session.accessToken);
          }
        } else if (status === "unauthenticated") {
          useUserStore.setState({ user: null });
          localStorage.removeItem('token');
        }

      } catch (error) {
        console.error('Error syncing user:', error);
      }
    };

    syncUser();
  }, [status, session]);

  return null;
};

export default SyncUser;