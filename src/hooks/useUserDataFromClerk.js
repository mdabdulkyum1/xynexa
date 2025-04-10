'use client'
import { useUser } from "@clerk/nextjs";
import { useGetUserByEmailQuery } from "@/redux/features/Api/userApi";

export const useUserDataFromClerk = () => {
  const { user } = useUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetUserByEmailQuery(userEmail, { skip: !userEmail });

  return { userData, isLoading, isError, error };
};