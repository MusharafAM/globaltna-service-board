"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/components/api";
import { useAuth } from "@/components/AuthProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Name is required";
    }

    if (!formData.email.trim()) {
      return "Email is required";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "Please enter a valid email address";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
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

      const result = await registerUser(formData);

      login(result.token, result.data);

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Create Account
      </h1>

      <p className="text-slate-600 mb-6">
        Register to post, update, and delete service requests.
      </p>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg mb-5">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            placeholder="Musharaf"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            placeholder="musharaf@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            placeholder="At least 6 characters"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
}