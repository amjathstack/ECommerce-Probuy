'use client'
import { closeUserProfile } from "@/features/components/componentsSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import profile_image from '../../public/icons/user.svg';
import { useEffect, useRef, useState } from "react";

export default function UserProfileCard() {

  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [prevProfile, setPrevProfile] = useState('');

  const handleProfileChange = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  }

  const changeProfileHandle = (file) => {
    setPrevProfile(URL.createObjectURL(file));
    setProfile(file);
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('profile', profile);
    editUserProfile({ token, formData, prevProfile });
    dispatch(closeUserProfile());
  }

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setPrevProfile(user?.profileImage)
    }
  }, [user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg animate-fadeIn relative">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            aria-label="Close"
            className="text-gray-500 hover:text-gray-800 transition"
            onClick={() => dispatch(closeUserProfile())}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Profile Photo</label>
            <div className="flex items-center gap-4">
              <Image
                width={85}
                height={85}
                className="object-cover border border-gray-200 rounded-full"
                src={prevProfile ? prevProfile : profile_image}
                alt="profile_image"
              />
              <div className="flex flex-col gap-2">
                <button
                  className="px-4 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  onClick={handleProfileChange}
                >
                  Change
                </button>
                <input ref={imageRef} onChange={(e) => changeProfileHandle(e.target.files[0])} className="hidden" type="file" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            onClick={() => dispatch(closeUserProfile())}
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit()}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>

      </div>
    </div>

  );
}
