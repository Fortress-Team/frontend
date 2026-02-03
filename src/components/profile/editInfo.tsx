// import React from 'react'
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";
import { Loader2, Upload } from "lucide-react";
import { uploadImage } from "../../lib/cloudinary";
// import type { User } from "../../types";
import { updateUserProfile } from "../../lib";

const EditInfo = () => {
  const { user: appUser } = useAuthStore();
  const { user: clerkUser, isSignedIn } = useUser();

  const [isSaving, setIsSaving] = useState(false);

  // Unified user object
  const user = isSignedIn ? clerkUser : appUser;

  const userId = user
    ? "_id" in user
      ? user._id
      : "id" in user
      ? user.id
      : null
    : null;

  const [basicInfo, setBasicInfo] = useState({
    fullName: user?.fullName || "",
    profRole: "",
    location: "",
    bio: "",
    avatar: "",
  });

  const [isUploading, setIsUploading] = useState<{ type: "avatar" | null }>({ type: null });

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "avatar") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading({ type });
    try {
      const url = await uploadImage(file);
      if (type === "avatar") {
        setBasicInfo((prev) => ({ ...prev, avatar: url }));
        toast.success("Profile photo uploaded!");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Internal server error";
      console.log(errorMessage);
      toast.error(errorMessage || "Image upload failed. Please try again.");
    } finally {
      setIsUploading({ type: null });
    }
  };

const handleAddInfo = async () => {
  if (!userId) {
    toast.error("Please login");
    return;
  }

  setIsSaving(true);

  try {
    const bio = basicInfo.bio || "Tell us about yourself!";
    const location = basicInfo.location || "Global";
    const profRole = basicInfo.profRole || "Talent";
    const avatar =
      basicInfo.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        basicInfo.fullName || user?.fullName || "User"
      )}&background=dbeafe&color=2563eb&size=512`;

    const updatedUser = await updateUserProfile(userId, {
      ...basicInfo,
      bio,
      location,
      profRole,
      avatar,
    });

    // Update local state immediately
  setBasicInfo({
  fullName: updatedUser.fullName || "",
  profRole: updatedUser.profRole || "",
  location: updatedUser.location || "",
  bio: updatedUser.bio || "",
  avatar: updatedUser.avatar || "",
});

    toast.success("Basic information updated!");
  } catch (error: unknown) {
    const err = error instanceof Error ? error?.message : "Failed to add user info";
    toast.error(err || "Failed to update info");
  } finally {
    setIsSaving(false);
  }
};

  return (
    <section className="p-8 rounded-2xl bg-white border-2 border-neutral-200 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-neutral-900 border-b border-neutral-200 pb-4">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 flex items-center gap-6 mb-4">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl border-4 border-white shadow-lg relative group overflow-hidden">
            {basicInfo.avatar ? (
              <img src={basicInfo.avatar} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-blue-600 font-bold">{user?.fullName?.charAt(0).toUpperCase()}</span>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-medium text-white uppercase tracking-wider">Preview</span>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-neutral-900">Profile Photo</h3>
            <p className="text-sm text-neutral-500 mb-4">Recommended: 400x400px (Optional)</p>
            <div className="flex flex-col gap-3">
              <div className="relative group w-fit">
                <input
                  type="text"
                  name="avatar"
                  placeholder="Image URL"
                  value={basicInfo.avatar}
                  onChange={handleBasicInfoChange}
                  className="w-full px-4 py-2 rounded-lg bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
                <div className="mt-2">
                  <label className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg cursor-pointer transition-colors text-sm font-medium w-fit">
                    {isUploading.type === "avatar" ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {isUploading.type === "avatar" ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "avatar")}
                      disabled={isUploading.type !== null}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="fullName"
            value={basicInfo.fullName}
            onChange={handleBasicInfoChange}
            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-neutral-700 mb-2">
            Professional Role
          </label>
          <input
            id="role"
            type="text"
            name="profRole"
            value={basicInfo.profRole}
            onChange={handleBasicInfoChange}
            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-2">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={basicInfo.location}
            onChange={handleBasicInfoChange}
            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 mb-2">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={basicInfo.bio}
            onChange={handleBasicInfoChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 border-t border-neutral-100 pt-6">
        <button
          onClick={handleAddInfo}
          disabled={isSaving}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white
          cursor-pointer font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
        >
          {isSaving && <Loader2 className="animate-spin" size={20} />}
          Save Basic Info
        </button>
      </div>
    </section>
  );
};

export default EditInfo;
