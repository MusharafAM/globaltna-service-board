"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { deleteJob, getJobById, updateJobStatus } from "@/components/api";
import { useAuth } from "@/components/AuthProvider";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const statuses = ["Open", "In Progress", "Closed"];

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    const loadJob = async () => {
      try {
        const result = await getJobById(id);

        if (!isMounted) return;

        setError("");
        setJob(result.data);
        setStatus(result.data.status);
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load job");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadJob();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      setStatus(newStatus);
      setMessage("");
      setError("");

      const result = await updateJobStatus(id, newStatus);
      setJob(result.data);
      setMessage("Status updated successfully");
    } catch (err) {
      setError(err.message || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job request?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to delete job");
    }
  };

  if (loading) {
    return <p className="text-slate-600">Loading job details...</p>;
  }

  if (error && !job) {
    return (
      <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {message && (
        <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-lg mb-5">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg mb-5">
          {error}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
            <p className="text-slate-500 mt-1">
              {job.category || "General"} • {job.location || "No location"}
            </p>
          </div>

          <select
            value={status}
            onChange={handleStatusChange}
            disabled={!user}
            className="border border-slate-300 rounded-lg px-4 py-2 bg-white h-fit"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-slate-900 mb-2">Description</h2>
          <p className="text-slate-700 leading-7">{job.description}</p>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <h2 className="font-semibold text-slate-900 mb-2">
            Contact Information
          </h2>

          <p className="text-slate-700">
            <span className="font-medium">Name:</span>{" "}
            {job.contactName || "Not provided"}
          </p>

          <p className="text-slate-700">
            <span className="font-medium">Email:</span>{" "}
            {job.contactEmail || "Not provided"}
          </p>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="text-sm text-slate-500">
            Created at: {new Date(job.createdAt).toLocaleString()}
          </p>
        </div>

        {user ? (
          <button
            onClick={handleDelete}
            className="mt-6 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
          >
            Delete Request
          </button>
        ) : ( <p className="mt-6 text-sm text-slate-500">
            Login required to update status or delete this request.
          </p>)} 
      </div>
    </div>
  );
}
