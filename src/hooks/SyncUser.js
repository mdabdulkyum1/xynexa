import { logout, setUser } from '@/redux/features/Slice/userSlice';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const SyncUser = () => {
  const { user, isSignedIn } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (isSignedIn && user) {
          dispatch(
            setUser({
              username: user.username || user.emailAddresses[0]?.emailAddress.split('@')[0],
              email: user.emailAddresses[0]?.emailAddress,
              photo: user.imageUrl,
            })
          );
        }else{
            dispatch(logout())
        }

      } catch (error) {
        console.error('Error syncing user:', error);
      }
    };

    syncUser(); 
  }, [isSignedIn, user, dispatch]);

  return null;
};

export default SyncUser;