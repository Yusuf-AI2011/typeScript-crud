import { useState } from "react";
import type { NewUser } from "../types/user";
import { createUser } from "../services/api";

export const useCreateUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addUser = async (user: NewUser)=> {
    try {
      setLoading(true);
      const request = await createUser(user);
      return request;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    addUser,
    loading,
    error,
  };
};
