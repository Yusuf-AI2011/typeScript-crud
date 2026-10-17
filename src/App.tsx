import React, { useState } from "react";
import { useCreateUsers } from "./hooks/useCreateUsers";
import { useUsers } from "./hooks/useUsers";
import type { EditUserId, NewUser } from "./types/user";
import { useDeleteUser } from "./hooks/useDeleteUser";
import EditModal from "./components/editModal";
import { toast, Toaster } from "react-hot-toast";

const App = () => {
  const { data, loading, error } = useUsers();
  const [userFormData, setUserFormData] = useState<NewUser>({
    name: "",
    email: "",
  });
  const [editId, setEditId] = useState<EditUserId>();
  const [editModal, setEditModal] = useState<boolean>(false);

  const {
    addUser,
    loading: createLoading,
    error: createError,
  } = useCreateUsers();

  const {
    loading: deleteLoading,
    error: deleteError,
    deleteUserFunc,
  } = useDeleteUser();

  // if (deleteLoading) toast.loading("Loading ...");
  // if (deleteError) toast.error(deleteError);
  // if (loading) toast.loading("Loading ...");
  // if (error) toast.error(error);
  // if (createLoading) toast.loading("Loading ...");
  // if (createError) toast.error(createError);

  function SubmitCreateNewUser(e: React.FormEvent) {
    e.preventDefault();

    if (!userFormData.name || !userFormData.email) {
      toast.error("Bo'sh joylarni to'ldiring!");
    }
    toast.promise(addUser(userFormData), {
      loading: "Loading...",
      success: <b>Muvaffaqiyatli yuklandi!</b>,
      error: <b>Xatolik yuz berdi!</b>,
    });
  }

  function SubmitDeleteUser(e: any) {
    toast.promise(deleteUserFunc(e), {
      loading: "Loading...",
      success: <b>Muvaffaqiyatli o'chirildii!</b>,
      error: <b>Xatolik yuz berdi!</b>,
    });
  }

  return (
    <div className="w-[100%] h-[100vh] text-mist-200 bg-mist-700 flex justify-center items-center flex-col gap-[30px]">
      <Toaster position="top-right" />
      <form className="flex justify-center items-center gap-[20px] p-[5px]">
        <input
          className="border-1 p-[5px] rounded-[8px]"
          onChange={(e) => {
            setUserFormData({ ...userFormData, name: e.target.value });
          }}
          placeholder="name"
          name="name"
          type="text"
        />
        <input
          className="border-1 p-[5px] rounded-[8px]"
          onChange={(e) => {
            setUserFormData({ ...userFormData, email: e.target.value });
          }}
          placeholder="email"
          name="email"
          type="email"
        />
        <button
          onClick={SubmitCreateNewUser}
          type="submit"
          className="w-[100px] h-[30px] rounded-[8px] bg-blue-600"
        >
          Qo'shish
        </button>
      </form>
      {editModal ? (
        <EditModal userId={editId} setEditModal={setEditModal} />
      ) : null}
      <div className="flex justify-center items-start flex-col gap-[20px]">
        {data.map((elem) => (
          <div
            key={elem.id}
            className="w-[600px] p-[5px] border-b-1 rounded-[8px] flex justify-center
         items-center"
          >
            <h1 className="w-[200px]">{elem.name}</h1>
            <p className="w-[200px]">{elem.email}</p>
            <div className="w-[200px] flex justify-center items-center gap-[20px]">
              <button
                className="w-[50px] h-[30px] rounded-[8px] bg-red-600"
                onClick={() => SubmitDeleteUser(elem.id)}
              >
                Delete
              </button>
              <button
                className="w-[50px] h-[30px] rounded-[8px] bg-orange-400"
                onClick={() => {
                  setEditId(elem.id);
                  setEditModal(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
