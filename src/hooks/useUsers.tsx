import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { getUsers } from "../services/api";

export const useUsers = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadingUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers();
        setData(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadingUsers();
  }, []);

  return {
    data,
    loading,
    error,
  };
};
