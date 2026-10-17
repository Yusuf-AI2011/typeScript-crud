import { useState } from "react";
import { editUser } from "../services/api";
import type { EditUser, EditUserId } from "../types/user";

export const useEditUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const edit = async (userId: EditUserId, changedUser: EditUser) => {
    try {
      setLoading(true);
      const request = await editUser(userId, changedUser);
      return request;
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    edit,
    loading,
    error,
  };
};
