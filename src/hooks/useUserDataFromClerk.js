'use client'
import { useSession } from "next-auth/react";
import { useGetUserByEmailQuery } from "@/redux/features/Api/userApi";

export const useUserDataFromClerk = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetUserByEmailQuery(userEmail, { skip: !userEmail });

  return { userData, isLoading, isError, error };
};