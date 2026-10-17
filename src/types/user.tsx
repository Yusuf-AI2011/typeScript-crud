export interface User {
  id: number;
  name: string;
  email: string;
}

export type NewUser = Omit<User, "id">;
export type DeleteUser = Pick<User, "id">;
export type EditUser = Omit<User, "id">;
export type EditUserId = Pick<User, "id">;
