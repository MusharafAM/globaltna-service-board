import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{job.title}</h2>
          <p className="text-sm text-slate-600 mt-1">{job.location}</p>
        </div>

        <span className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full h-fit">
          {job.status}
        </span>
      </div>

      <p className="text-slate-700 mt-3 line-clamp-2">{job.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-slate-500">{job.category || "General"}</span>

        <Link
          href={`/jobs/${job._id}`}
          className="text-sm font-medium text-slate-900 hover:underline"
        >
          View details
        </Link>
      </div>
    </div>
  );
}