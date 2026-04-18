"use client";
import { useState } from "react";
import { MdPerson, MdLocationOn, MdUpload, MdClose } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import Image from "next/image";
import { useAuthStore } from "@/Store/AuthStore";
import { useUserActions } from "@/Store/UserAction";

// ── shared styles ─────────────────────────────────────────────────────────────
const base =
  "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-sm";
const ok = "border-gray-200 bg-gray-50 focus:bg-white";
const err = "border-red-400 bg-red-50";

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const EditProfile = () => {
  const { user } = useAuthStore();
  const { updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user.profilePicUrl);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    username: user.username || "",
    city: user.address?.city || "",
    state: user.address?.state || "",
    country: user.address?.country || "",
  });

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.username || form.username.trim().length < 2)
      e.username = "Username must be at least 2 characters";
    if (!form.city) e.city = "City is required";
    if (!form.state) e.state = "State is required";
    if (!form.country) e.country = "Country is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(user.profilePicUrl); // revert to original
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      const fd = new FormData();
      fd.append("username", form.username);
      fd.append("city", form.city);
      fd.append("state", form.state);
      fd.append("country", form.country);
      if (imageFile) fd.append("file", imageFile);

      await updateUser({ formData: fd, id: user._id });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div>
        <div className="bg-white shadow-xl overflow-hidden">
          {/* Header band */}
          <div className="bg-linear-to-r from-primary to-amber-500 px-8 pt-8 pb-6">
            <h1 className="text-white text-2xl font-bold mb-1">
              ✏️ Edit Profile
            </h1>
            <p className="text-orange-100 text-sm">
              Update your personal information
            </p>
          </div>

          <div className="px-6 sm:px-8 py-8 space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-purple-200 group">
                <Image
                  src={previewUrl}
                  alt="profile"
                  fill
                  className="object-cover"
                />
                {imageFile && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-600"
                  >
                    <MdClose className="text-sm" />
                  </button>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                  id="profile-pic-upload"
                />
                <label
                  htmlFor="profile-pic-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 cursor-pointer transition"
                >
                  <MdUpload className="text-base" /> Change Photo
                </label>
              </div>
            </div>

            {/* Personal Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MdPerson className="text-orange-500" />
                </div>
                <h3 className="font-bold text-gray-700">Personal Info</h3>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <Field label="Username *" error={errors.username}>
                  <input
                    value={form.username}
                    onChange={(e) => set("username", e.target.value)}
                    className={`${base} ${errors.username ? err : ok}`}
                    placeholder="Your username"
                  />
                </Field>
              </div>
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MdLocationOn className="text-orange-500" />
                </div>
                <h3 className="font-bold text-gray-700">Address</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="City *" error={errors.city}>
                  <input
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    className={`${base} ${errors.city ? err : ok}`}
                    placeholder="e.g., Mumbai"
                  />
                </Field>
                <Field label="State *" error={errors.state}>
                  <input
                    value={form.state}
                    onChange={(e) => set("state", e.target.value)}
                    className={`${base} ${errors.state ? err : ok}`}
                    placeholder="e.g., Maharashtra"
                  />
                </Field>
                <Field label="Country *" error={errors.country}>
                  <input
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    className={`${base} ${errors.country ? err : ok}`}
                    placeholder="e.g., India"
                  />
                </Field>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <ImSpinner8 className="text-sm animate-spin" /> Saving…
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
