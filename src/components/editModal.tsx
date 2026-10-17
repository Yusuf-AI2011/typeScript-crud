import React, { useState } from "react";
import type { EditUser, EditUserId } from "../types/user";
import { useEditUser } from "../hooks/useEditUser";
import toast, { Toaster } from "react-hot-toast";

const editModal = (userId: EditUserId, setEditModal: boolean) => {
  const [formData, setFormData] = useState<EditUser>({
    name: "",
    email: "",
  });

  const { edit, loading, error } = useEditUser();

  // if (loading) return <h1>Loading ...</h1>;
  // if (error) return <h1>{error}</h1>;

  function HandleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.promise(edit(userId, formData), {
      loading: "Loading...",
      success: <b>Muvaffaqiyatli o'zgardi!</b>,
      error: <b>Xatolik yuz berdi!</b>,
    });
  }

  return (
    <div className="w-[100%] h-[100vh] absolute left-0 top-0 text-mist-200 bg-mist-700 flex justify-center items-center">
      <Toaster position="top-right" />
      <form className="w-[300px] h-[200px] rounded-[8px] flex justify-center items-center flex-col gap-[20px] shadow-sm shadow-mist-200">
        <input
          className="border-1 rounded-[8px] p-[3px]"
          onChange={(e) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            });
          }}
          value={formData.name}
          name="name"
          placeholder="name"
          type="text"
        />
        <input
          className="border-1 rounded-[8px] p-[3px]"
          onChange={(e) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            });
          }}
          value={formData.email}
          name="email"
          placeholder="email"
          type="text"
        />
        <div className="flex justify-center items-center gap-[30px]">
          <button
            className="w-[70px] h-[30px] rounded-[8px] bg-green-600"
            onClick={HandleSubmit}
            type="submit"
          >
            Save
          </button>
          <button
            className="w-[70px] h-[30px] rounded-[8px] bg-red-600"
            onClick={() => {
              setEditModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default editModal;
