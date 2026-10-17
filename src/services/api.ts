import type {
  DeleteUser,
  NewUser,
  User,
  EditUserId,
  EditUser,
} from "../types/user";

export const getUsers = async (): Promise<User[]> => {
  const request = await fetch(`https://jsonplaceholder.typicode.com/users`);

  if (!request.ok) {
    throw new Error("Yuklanishga oid xato!");
  }

  const data = await request.json();

  return data;
};

export const createUser = async (user: NewUser): Promise<User[]> => {
  const request = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!request.ok) {
    throw new Error("Yuklanishda xato yuz berdi!");
  }

  return request.json();
};

export const deleteUser = async (userId: DeleteUser): Promise<User[]> => {
  const request = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!request.ok) {
    throw new Error("Ochirishda xatolik yuz berdi!");
  }

  return request.json();
};

export const editUser = async (
  userId: EditUserId,
  changedUser: EditUser,
): Promise<User[]> => {
  const request = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedUser),
    },
  );

  if (!request.ok) {
    throw new Error("O'zgartirishga oid xato yuz berdi!");
  }

  return request.json();
};
