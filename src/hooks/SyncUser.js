import { logout, setUser } from '@/redux/features/Slice/userSlice';
import { useSession } from "next-auth/react";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const SyncUser = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (status === "authenticated" && session?.user) {
          dispatch(
            setUser({
              username: session.user.name || session.user.email.split('@')[0],
              email: session.user.email,
              photo: session.user.image,
              role: session.user.role,
              id: session.user.id
            })
          );
        } else if (status === "unauthenticated") {
          dispatch(logout())
        }

      } catch (error) {
        console.error('Error syncing user:', error);
      }
    };

    syncUser();
  }, [status, session, dispatch]);

  return null;
};

export default SyncUser;