import { User } from "@/types";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { getCookie } from "@/usertoken";
export const useGetMyUser = () => {
  const getMyUserRequest = async (): Promise<User> => {
    const response = await fetch(`http://localhost:7000/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie('usertoken')}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const userData = await response.json(); 
    const { name, email, imageId, latitude, longtitude } = userData;
    const user: User = {
      name,
      email,
      imageId,
      latitude,
      longtitude,
    };
    return user;
  };
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery<User>("fetchCurrentUser", getMyUserRequest); // Specify User type for useQuery
  if (error) {
    toast.error(error.toString());
  }
  return { currentUser, isLoading };
};
