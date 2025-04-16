"use client";

import { offlineUser } from "@/app/actions/offlineUser";
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

export function OfflineUserToDB() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const prevUser = usePrevious(user);

  useEffect(() => {
    if (prevUser && !user && !isSignedIn) {
      offlineUser({
        clerkId: prevUser.id,
      });
    }
  }, [user, isSignedIn, prevUser]);

  return <></>;
}
