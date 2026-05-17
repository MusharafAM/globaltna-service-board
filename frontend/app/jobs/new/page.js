"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/components/api";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function NewJobPage() {
  const router = useRouter();
  const { user, authLoading } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const categories = ["Plumbing", "Electrical", "Painting", "Joinery"];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      return "Title is required";
    }

    if (!formData.description.trim()) {
      return "Description is required";
    }

    if (formData.contactEmail && !/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await createJob(formData);

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
  return <p className="text-slate-600">Checking authentication...</p>;
}

if (!user) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        Login Required
      </h1>

      <p className="text-slate-600 mb-5">
        You need to login before posting a service request.
      </p>

      <Link
        href="/login"
        className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700"
      >
        Go to Login
      </Link>
    </div>
  );
}

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Create New Service Request
      </h1>

      <p className="text-slate-600 mb-6">
        Add a homeowner service request for tradespeople to view.
      </p>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Need a plumber for leaking kitchen tap"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Describe the service request clearly"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Glasgow"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Name</label>
          <input
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="John Smith"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Email
          </label>
          <input
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create Request"}
        </button>
      </form>
    </div>
  );
}
