"use client";
import { useAdminStore } from "@/Store/AdminStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const statusStyles = {
  pending: "bg-amber-100 text-amber-800",
  "in review": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  rejecting: "bg-red-100 text-red-800",
};

const adoptionStyles = {
  available: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  adopted: "bg-purple-100 text-purple-800",
};

const FILTERS = ["All", "pending", "in review", "resolved", "rejecting"];

const ReportedPosts = () => {
  const {
    showReportedPosts,
    reportedPosts,
    managePostStatus,
    manageReportStatus,
    isLoading,
  } = useAdminStore();

  const [filter, setFilter] = useState("All");
  const [reportStatuses, setReportStatuses] = useState({});

  useEffect(() => {
    showReportedPosts();
  }, []);

  useEffect(() => {
    if (reportedPosts?.length) {
      const initialStatuses = {};
      reportedPosts.forEach((r) => {
        initialStatuses[r._id] = r.status;
      });
      setReportStatuses(initialStatuses);
    }
  }, [reportedPosts]);

  const seen = new Set();
  const deduplicated = reportedPosts.filter((report) => {
    if (!report.targetId) return false;
    const postId = report.targetId._id;
    if (seen.has(postId)) return false;
    seen.add(postId);
    return true;
  });

  const filtered =
    filter === "All"
      ? deduplicated
      : deduplicated.filter((r) => r.status === filter);

  const pendingCount = deduplicated.filter(
    (r) => r.status === "pending",
  ).length;
  const resolvedCount = deduplicated.filter(
    (r) => r.status === "resolved",
  ).length;

  const handleManagePost = async (postId, postStatus) => {
    await managePostStatus(postId, postStatus);
  };

  const handleReportStatus = async (reportId, reportStatus) => {
    console.log({ reportId, reportStatus });

    await manageReportStatus(reportId, reportStatus);
  };

  return (
    <div className="px-4 py-8 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-900">Reported posts</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and moderate flagged pet listings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          {
            label: "Total reported",
            value: deduplicated.length,
            color: "text-gray-900",
          },
          {
            label: "Pending review",
            value: pendingCount,
            color: "text-amber-700",
          },
          { label: "Resolved", value: resolvedCount, color: "text-green-700" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-2xl font-medium ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm px-3 py-1.5 rounded-md border transition-colors capitalize ${
              filter === f
                ? "bg-blue-50 text-blue-700 border-transparent"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No reports found.</div>
      ) : (
        <div className="flex flex-col gap-3 ">
          {filtered.map((report) => {
            const post = report.targetId;
            const reporter = report.reporterId;
            const timeAgo = new Date(report.createdAt).toLocaleDateString();

            return (
              <div
                key={report._id}
                className="bg-white border border-gray-100 rounded-xl p-5 my-2 shadow-xl"
              >
                {/* Top row */}
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div className="flex gap-3 items-start">
                    {post?.images?.[0]?.picURL ? (
                      <Image
                        src={post.images[0].picURL}
                        width={60}
                        height={60}
                        alt={post.animalBreed}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                        🐾
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {post?.animalBreed} · {post?.gender}
                        {post?.age
                          ? ` · ${post.age} yr${post.age > 1 ? "s" : ""}`
                          : ""}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        📍 {post?.location}
                      </p>
                      <div className="flex gap-1.5 mt-1.5">
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-md font-medium capitalize ${
                            adoptionStyles[post?.adoptionStatus] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {post?.adoptionStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-md font-medium capitalize ${
                        statusStyles[report.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {report.status}
                    </span>
                    <span className="text-xs text-gray-400">{timeAgo}</span>
                  </div>
                </div>

                <hr className="border-gray-100 my-3" />

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  {[
                    ["Health", post?.healthCondition],
                    ["Vaccinated", post?.vaccinationStatus],
                    ["Sterilized", post?.sterilizationStatus],
                    ["Requests", `${post?.requests?.length ?? 0} users`],
                  ].map(([label, val]) => (
                    <p key={label}>
                      <span className="text-gray-400">{label}: </span>
                      <span className="font-medium text-gray-700">{val}</span>
                    </p>
                  ))}
                </div>

                {/* Reason */}
                <div className="bg-gray-50 rounded-lg px-3 py-2 mb-3">
                  <p className="text-xs text-gray-400 mb-0.5">Report reason</p>
                  <p className="text-sm text-gray-700">{report.reason}</p>
                  {report.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {report.description}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-0 justify-between items-center">
                  <div className="flex items-center gap-2">
                    {reporter?.profilePicUrl ? (
                      <Image
                        src={reporter.profilePicUrl}
                        width={28}
                        height={28}
                        alt="Reporter"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-xs font-medium text-blue-700">
                        {reporter?.username?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {reporter?.username}
                      </p>
                      <p className="text-xs text-gray-400">{reporter?.email}</p>
                    </div>
                  </div>
                  {report.status !== "resolved" && (
                    <div className="w-full sm:w-auto flex justify-between items-center gap-1.5">
                      <button
                        onClick={() => handleManagePost(post._id, "visible")}
                        className="text-xs px-3 py-1.5 rounded-md border border-green-200 text-green-700 hover:bg-green-50 transition-colors"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => handleManagePost(post._id, "deleted")}
                        className="text-xs px-3 py-1.5 rounded-md border border-red-200 text-red-700 hover:bg-red-50 transition-colors"
                      >
                        Remove post
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <select
                    value={reportStatuses[report._id] || ""}
                    onChange={(e) =>
                      setReportStatuses((prev) => ({
                        ...prev,
                        [report._id]: e.target.value,
                      }))
                    }
                    className="px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                  >
                    <option value="">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in review">In review</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejecting">Rejecting</option>
                  </select>
                  <button
                    onClick={() =>
                      handleReportStatus(report._id, reportStatuses[report._id])
                    }
                    className="text-xs px-3 py-1.5 rounded-md border border-red-200 text-red-700 hover:bg-red-50 transition-colors"
                  >
                    Change Status
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReportedPosts;
