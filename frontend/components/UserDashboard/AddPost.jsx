"use client";
import { useState } from "react";
import { GiPawPrint } from "react-icons/gi";
import {
  MdLocationOn,
  MdDescription,
  MdOutlineAddPhotoAlternate,
  MdUpload,
  MdClose,
} from "react-icons/md";
import { FaChevronRight, FaChevronLeft, FaPlus } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useUserActions } from "@/Store/UserAction";
import { useAuthStore } from "@/Store/AuthStore";

// ── constants ─────────────────────────────────────────────────────────────────
const ANIMAL_TYPES = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Fish",
  "Hamster",
  "Other",
];
const GENDERS = ["Male", "Female"];
const HEALTH_CONDITIONS = [
  "Healthy",
  "Minor Treatable issue",
  "Special needs",
  "Under treatment",
  "Recovering",
  "Unknown",
];
const VACCINATION_STATUSES = [
  "Fully vaccinated",
  "Partially vaccinated",
  "Not vaccinated",
  "Not required",
  "Vaccination in progress",
  "Unknown",
];
const STERILIZATION_STATUSES = [
  "Sterilized",
  "Not sterilized",
  "Scheduled",
  "Not applicable",
  "Unknown",
];

const STEPS = [
  { number: 1, title: "Animal Info", icon: GiPawPrint },
  { number: 2, title: "Health", icon: MdDescription },
  { number: 3, title: "Location", icon: MdLocationOn },
  { number: 4, title: "Photos", icon: MdOutlineAddPhotoAlternate },
];

const INITIAL = {
  animalType: "",
  animalBreed: "",
  age: "",
  gender: "",
  healthCondition: "",
  vaccinationStatus: "",
  sterilizationStatus: "",
  location: "",
  description: "",
  images: [],
};

// ── shared styles ─────────────────────────────────────────────────────────────
const base =
  "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition text-sm";
const ok = "border-gray-200 bg-gray-50 focus:bg-white";
const err = "border-red-400 bg-red-50";

// ── Field wrapper ─────────────────────────────────────────────────────────────
const Field = ({ label, error, children, span2 = false }) => (
  <div className={span2 ? "md:col-span-2" : ""}>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// ── StepHeader ────────────────────────────────────────────────────────────────
const StepHeader = ({ icon: Icon, title, sub }) => (
  <div className="text-center mb-6">
    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <Icon className="text-3xl text-orange-500" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    <p className="text-gray-500 text-sm mt-1">{sub}</p>
  </div>
);

// ── Step 1 ────────────────────────────────────────────────────────────────────
const Step1 = ({ form, errors, set }) => (
  <div className="space-y-6">
    <StepHeader
      icon={GiPawPrint}
      title="Animal Information"
      sub="Tell us about the pet you're posting"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Field label="Animal Type *" error={errors.animalType}>
        <select
          value={form.animalType}
          onChange={(e) => set("animalType", e.target.value)}
          className={`${base} ${errors.animalType ? err : ok}`}
        >
          <option value="">Select animal type</option>
          {ANIMAL_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field label="Breed *" error={errors.animalBreed}>
        <input
          value={form.animalBreed}
          onChange={(e) => set("animalBreed", e.target.value)}
          className={`${base} ${errors.animalBreed ? err : ok}`}
          placeholder="e.g., Golden Retriever"
        />
      </Field>

      <Field label="Age (years)" error={errors.age}>
        <input
          type="number"
          min="0"
          step="0.5"
          value={form.age}
          onChange={(e) => set("age", e.target.value)}
          className={`${base} ${errors.age ? err : ok}`}
          placeholder="e.g., 2"
        />
      </Field>

      <Field label="Gender *" error={errors.gender}>
        <div className="flex gap-3 mt-1">
          {GENDERS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => set("gender", g)}
              className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all
                  ${
                    form.gender === g
                      ? "border-orange-400 bg-orange-50 text-orange-600"
                      : "border-gray-200 text-gray-500 hover:border-orange-200"
                  }`}
            >
              {g === "Male" ? "♂ Male" : "♀ Female"}
            </button>
          ))}
        </div>
        {errors.gender && (
          <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
        )}
      </Field>
    </div>
  </div>
);

// ── Step 2 ────────────────────────────────────────────────────────────────────
const Step2 = ({ form, errors, set }) => (
  <div className="space-y-6">
    <StepHeader
      icon={MdDescription}
      title="Health & Description"
      sub="Health status and more about the pet"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Field label="Health Condition *" error={errors.healthCondition}>
        <select
          value={form.healthCondition}
          onChange={(e) => set("healthCondition", e.target.value)}
          className={`${base} ${errors.healthCondition ? err : ok}`}
        >
          <option value="">Select condition</option>
          {HEALTH_CONDITIONS.map((h) => (
            <option key={h}>{h}</option>
          ))}
        </select>
      </Field>

      <Field label="Vaccination Status *" error={errors.vaccinationStatus}>
        <select
          value={form.vaccinationStatus}
          onChange={(e) => set("vaccinationStatus", e.target.value)}
          className={`${base} ${errors.vaccinationStatus ? err : ok}`}
        >
          <option value="">Select status</option>
          {VACCINATION_STATUSES.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </Field>

      <Field label="Sterilization Status *" error={errors.sterilizationStatus}>
        <select
          value={form.sterilizationStatus}
          onChange={(e) => set("sterilizationStatus", e.target.value)}
          className={`${base} ${errors.sterilizationStatus ? err : ok}`}
        >
          <option value="">Select status</option>
          {STERILIZATION_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>

      <Field label="Description" error={errors.description} span2>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className={`${base} resize-none ${errors.description ? err : ok}`}
          placeholder="Describe the pet's personality, habits, special needs..."
        />
      </Field>
    </div>
  </div>
);

// ── Step 3 ────────────────────────────────────────────────────────────────────
const Step3 = ({ form, errors, set }) => (
  <div className="space-y-6">
    <StepHeader
      icon={MdLocationOn}
      title="Location"
      sub="Where is the pet currently located?"
    />
    <Field label="Location *" error={errors.location}>
      <input
        value={form.location}
        onChange={(e) => set("location", e.target.value)}
        className={`${base} ${errors.location ? err : ok}`}
        placeholder="e.g., Mumbai, Maharashtra"
      />
    </Field>
    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-sm text-orange-700">
      <p className="font-semibold mb-1">📍 Tip</p>
      <p>
        Add a city or neighbourhood so potential adopters nearby can find your
        post easily.
      </p>
    </div>
  </div>
);

// ── Step 4 ────────────────────────────────────────────────────────────────────
const Step4 = ({ form, addImages, removeImage }) => (
  <div className="space-y-6">
    <StepHeader
      icon={MdOutlineAddPhotoAlternate}
      title="Photos"
      sub="Add clear photos to attract more adopters"
    />

    <div className="border-2 border-dashed border-orange-200 rounded-2xl p-8 text-center bg-orange-50/40 hover:bg-orange-50 transition-colors">
      <MdOutlineAddPhotoAlternate className="text-5xl text-orange-300 mx-auto mb-3" />
      <p className="text-gray-500 text-sm mb-4">PNG, JPG up to 5 MB each</p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={addImages}
        className="hidden"
        id="pet-image-upload"
      />
      <label
        htmlFor="pet-image-upload"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 cursor-pointer transition-colors shadow-sm"
      >
        <MdUpload className="text-base" /> Choose Photos
      </label>
    </div>

    {form.images.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {form.images.map((img, i) => (
          <div
            key={img.previewUrl}
            className="relative group rounded-xl overflow-hidden aspect-square shadow-sm"
          >
            <img
              src={img.previewUrl}
              alt={`Pet ${i + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <button
              type="button"
              onClick={() => removeImage(img.previewUrl)}
              className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
      </div>
    )}

    {form.images.length === 0 && (
      <p className="text-center text-xs text-gray-400">
        No photos added yet — you can still submit without them.
      </p>
    )}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const AddPost = () => {
  const { user } = useAuthStore();
  const { createPost } = useUserActions();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const set = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.animalType) e.animalType = "Animal type is required";
      if (!form.animalBreed) e.animalBreed = "Breed is required";
      if (!form.gender) e.gender = "Gender is required";
      if (form.age !== "" && (isNaN(form.age) || Number(form.age) < 0))
        e.age = "Enter a valid age";
    }
    if (s === 2) {
      if (!form.healthCondition)
        e.healthCondition = "Health condition is required";
      if (!form.vaccinationStatus)
        e.vaccinationStatus = "Vaccination status is required";
      if (!form.sterilizationStatus)
        e.sterilizationStatus = "Sterilization status is required";
    }
    if (s === 3) {
      if (!form.location) e.location = "Location is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validate(step) && setStep((p) => Math.min(p + 1, 4));
  const prev = () => setStep((p) => Math.max(p - 1, 1));

  const addImages = (e) => {
    Array.from(e.target.files).forEach((file) => {
      setForm((p) => ({
        ...p,
        images: [
          ...p.images,
          { imageFile: file, previewUrl: URL.createObjectURL(file) },
        ],
      }));
    });
  };

  const removeImage = (url) =>
    setForm((p) => ({
      ...p,
      images: p.images.filter((i) => i.previewUrl !== url),
    }));

  const handleSubmit = async () => {
    if (!validate(step)) return;

    setIsLoading(true);
    try {
      const fd = new FormData();
      form.images.forEach((img) => fd.append("files", img.imageFile));
      const { images, ...rest } = form;
      Object.entries(rest).forEach(([key, value]) => fd.append(key, value));
      fd.append("userId", user._id);
      await createPost(fd);
      setForm(INITIAL);
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="flex-1 overflow-y-auto">
      <div>
        <div className="bg-white shadow-xl overflow-hidden">
          {/* Header band */}
          <div className="bg-linear-to-r from-primary to-amber-500 px-8 pt-8 pb-6">
            <h1 className="text-white text-2xl font-bold mb-1">
              🐾 Add a Pet Post
            </h1>
            <p className="text-orange-100 text-sm">
              Help a pet find their forever home
            </p>

            {/* Step pills */}
            <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const done = step > s.number;
                const current = step === s.number;
                return (
                  <div
                    key={s.number}
                    className="flex items-center gap-2 shrink-0"
                  >
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                        ${
                          current
                            ? "bg-white text-orange-600 shadow-md"
                            : done
                              ? "bg-orange-400/60 text-white"
                              : "bg-orange-400/30 text-orange-100"
                        }`}
                    >
                      <Icon className="text-xs" />
                      <span className="hidden sm:inline">{s.title}</span>
                      <span className="sm:hidden">{s.number}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`w-6 h-0.5 rounded-full ${done ? "bg-white/60" : "bg-orange-400/30"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1.5 bg-orange-400/30 rounded-full">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form body */}
          <div className="px-6 sm:px-8 py-8">
            {step === 1 && <Step1 form={form} errors={errors} set={set} />}
            {step === 2 && <Step2 form={form} errors={errors} set={set} />}
            {step === 3 && <Step3 form={form} errors={errors} set={set} />}
            {step === 4 && (
              <Step4
                form={form}
                addImages={addImages}
                removeImage={removeImage}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={prev}
                disabled={step === 1}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                    ${
                      step === 1
                        ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
              >
                <FaChevronLeft className="text-xs" /> Previous
              </button>

              <span className="text-xs text-gray-400 font-medium">
                Step {step} of {STEPS.length}
              </span>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={next}
                  className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-all shadow-sm"
                >
                  Next <FaChevronRight className="text-xs" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <ImSpinner8 className="text-sm animate-spin" />{" "}
                      Submitting…
                    </>
                  ) : (
                    <>
                      <FaPlus className="text-sm" /> Post Listing
                    </>
                  )}
                </button>
              )}
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              All pet posts are reviewed before going live · Pawfect
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
