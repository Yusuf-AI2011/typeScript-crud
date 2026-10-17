import { useState } from "react";
import { deleteUser } from "../services/api";
import type { DeleteUser } from "../types/user";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUserFunc = async (userId: DeleteUser) => {
    try {
      setLoading(true);
      const request = await deleteUser(userId);
      return request;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUserFunc,
    loading,
    error,
  };
};
