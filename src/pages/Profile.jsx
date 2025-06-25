import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const initialProfileState = {
    name: "John Doe",
    email: "john@example.com",
    location: "New York, NY",
    bio: "Frontend Developer with 5 years of experience",
  };
  const [profile, setProfile] = useState(initialProfileState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profile.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Handle actual profile update (e.g., API call)
      console.log("Profile updated:", profile);
      toast.success("Profile updated successfully!");
    }
  };

  const handleReset = () => {
    setProfile(initialProfileState);
    setErrors({});
    toast.info("Profile changes reset.");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Profile</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <FaUser className="text-3xl text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{profile.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className={`form-input input-black-when-empty input-dark-when-filled ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className={`form-input input-black-when-empty input-dark-when-filled ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="form-input input-black-when-empty input-dark-when-filled"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows="4"
              className="form-input input-black-when-empty input-dark-when-filled"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={handleReset} className="btn bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 