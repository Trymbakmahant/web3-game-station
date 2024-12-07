import React, { useState } from "react";

type UserModalProps = {
  closeModal: () => void;
};

const UserModal: React.FC<UserModalProps> = ({ closeModal }) => {
  const [userId, setUserId] = useState("");

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl text-brown-600 hover:text-brown-800"
        >
          &times;
        </button>
        <h2 className="text-3xl font-semibold text-brown-800 mb-4">
          Enter User ID
        </h2>
        <form>
          <label
            htmlFor="userId"
            className="block text-lg font-medium text-brown-800"
          >
            User ID:
          </label>
          <input
            type="text"
            id="userId"
            className="w-full p-2 mt-2 border-2 border-brown-600 rounded-md"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
