"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { getJobs } from "@/components/api";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["", "Plumbing", "Electrical", "Painting", "Joinery"];

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      try {
        const result = await getJobs(category);

        if (!isMounted) return;

        setError("");
        setJobs(result.data);
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Open Service Requests
          </h1>
          <p className="text-slate-600 mt-1">
            Browse homeowner service requests and manage their status.
          </p>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 bg-white"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item || "All Categories"}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-slate-600">Loading jobs...</p>}

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="bg-white border border-slate-200 p-6 rounded-xl text-center">
          <p className="text-slate-600">No job requests found.</p>
        </div>
      )}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
