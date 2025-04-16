"use client";

import { loginUser } from "@/app/actions/loginUser";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

// Hook to get previous value (JSX version)
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function LoginUserToDB() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const prevUser = usePrevious(user);

  useEffect(() => {
    // Trigger when user has just logged in
    if (!prevUser && user && isSignedIn) {
      loginUser({
        clerkId: user.id
      });
    }
  }, [user, isSignedIn, prevUser]);

  return <></>;
}
