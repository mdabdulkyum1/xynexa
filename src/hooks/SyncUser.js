import useUserStore from '@/store/useUserStore';
import { useSession } from "next-auth/react";
import React, { useEffect } from 'react';

const SyncUser = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (status === "authenticated" && session?.user) {
          const currentUser = useUserStore.getState().user;

          // Only sync if store is empty or we have new session info
          // but don't overwrite detailed DB data with minimal session data
          if (!currentUser || !currentUser.id) {
            useUserStore.setState({
              user: {
                firstName: session.user.name?.split(' ')[0] || session.user.email.split('@')[0],
                lastName: session.user.name?.split(' ').slice(1).join(' ') || "",
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                imageUrl: session.user.image, // Fallback to session image initially
                role: session.user.role,
                id: session.user.id,
                _id: session.user.id
              }
            });
          }

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