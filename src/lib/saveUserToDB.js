"use client";


import { saveUser } from "@/app/actions/saveUser";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function SaveUserToDB() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect( ()=> {
    if (isSignedIn && user) {
        saveUser({
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.primaryEmailAddress.emailAddress,
            imageUrl: user.imageUrl,
          });

          
    }
  } ,[isSignedIn, user]);

}