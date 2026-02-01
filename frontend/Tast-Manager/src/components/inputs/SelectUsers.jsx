import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuUsers } from "react-icons/lu";
import Model from "../Model";
import AvatarGroup from "../AvatarGroup";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  //fetch all users
  // const getAllUsers = async () => {
  //   try {
  //     const response = await axiosInstance.get(API_PATHS.GET_ALL_USERS);
  //     if (response.data?.length > 0) {
  //       setAllUsers(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
        console.log("Fetched users:", res.data); // DEBUG
        setAllUsers(res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    getAllUsers();
  }, []);

  //hooks must be there
  // useEffect(() => {
  //   getAllUsers();
  // }, []);

  //toogle checkbox
  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  // assign users
  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  //avatars
  // const selectedUserAvatars = allUsers
  //   .filter((user) => selectedUsers.includes(user._id))
  //   .map((user) => user.profileImageUrl);

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id) && user.profileImageUrl)
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
    return () => {};
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button onClick={() => setIsModalOpen(true)} className="card-btn">
          <LuUsers className="text-sm" />
          Add Members
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      <Model
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"c
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border-b border-gray-200"
            >
              <img
                src={user.profileImageUrl || "/avatar.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white">
                  {user.name}
                </p>
                <p className="text-[13px] text-gray-500">{user.email}</p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none "
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button className="card-btn" onClick={() => setIsModalOpen(false)}>
            CANCEL
          </button>
          <button className="card-btn-fill" onClick={handleAssign}>
            DONE
          </button>
        </div>
      </Model>
    </div>
  );
};
export default SelectUsers;
