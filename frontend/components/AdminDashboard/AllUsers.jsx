"use client";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/Store/AdminStore";
import Image from "next/image";

const STATUS_CONFIG = {
  active: {
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  suspended: {
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-400",
  },
  deleted: {
    badge: "bg-red-50 text-red-700 ring-1 ring-red-200",
    dot: "bg-red-400",
  },
};

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const AllUsers = () => {
  const { showAllUsers, users, isLoading, manageUserStatus } = useAdminStore();

  const [pendingStatus, setPendingStatus] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    showAllUsers();
  }, []);

  const handleStatusChange = (id, value) => {
    setPendingStatus((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async (user) => {
    const newStatus = pendingStatus[user._id];
    if (!newStatus || newStatus === user.accountStatus) return;
    setSavingId(user._id);
    try {
      await manageUserStatus(user._id, newStatus);
      setPendingStatus((prev) => {
        const next = { ...prev };
        delete next[user._id];
        return next;
      });
    } finally {
      setSavingId(null);
    }
  };

  const filtered = (users ?? []).filter((u) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      u.username?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q);
    const matchS = !statusFilter || u.accountStatus === statusFilter;
    return matchQ && matchS;
  });

  const counts = {
    total: (users ?? []).length,
    active: (users ?? []).filter((u) => u.accountStatus === "active").length,
    suspended: (users ?? []).filter((u) => u.accountStatus === "suspended")
      .length,
    deleted: (users ?? []).filter((u) => u.accountStatus === "deleted").length,
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 pb-24 sm:pb-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Users
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage account statuses across your platform
            </p>
          </div>
          <span className="text-xs font-medium text-gray-400 bg-white border border-gray-200 px-3 py-1.5 rounded-full mt-1">
            {counts.total} total
          </span>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              label: "Active",
              value: counts.active,
              color: "text-emerald-600",
            },
            {
              label: "Suspended",
              value: counts.suspended,
              color: "text-amber-500",
            },
            { label: "Deleted", value: counts.deleted, color: "text-red-500" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-gray-100 px-4 py-3"
            >
              <p className="text-[8px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                {label}
              </p>
              <p className={`text-2xl sm:text-3xl font-semibold ${color}`}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-0">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-gray-50/70 gap-3">
            <span className="flex-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              User
            </span>
            <span className="hidden md:block w-52 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Email
            </span>
            <span className="hidden lg:block w-28 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Joined
            </span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">
              Actions
            </span>
          </div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="divide-y divide-gray-100">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center px-4 py-4 gap-3 animate-pulse"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
                    <div className="space-y-1.5 min-w-0">
                      <div className="h-3 w-28 bg-gray-100 rounded" />
                      <div className="h-2.5 w-20 bg-gray-100 rounded md:hidden" />
                    </div>
                  </div>
                  <div className="hidden md:block w-52">
                    <div className="h-3 w-36 bg-gray-100 rounded" />
                  </div>
                  <div className="hidden lg:block w-28">
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-20 bg-gray-100 rounded-lg" />
                    <div className="h-7 w-14 bg-gray-100 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* User rows */}
          {!isLoading && (
            <div className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-gray-400 text-sm">
                    No users match your search.
                  </p>
                </div>
              ) : (
                filtered.map((user) => {
                  const current = pendingStatus[user._id] ?? user.accountStatus;
                  const cfg =
                    STATUS_CONFIG[user.accountStatus] ?? STATUS_CONFIG.active;
                  const isDirty =
                    pendingStatus[user._id] &&
                    pendingStatus[user._id] !== user.accountStatus;
                  const isSaving = savingId === user._id;

                  return (
                    <div
                      key={user._id}
                      className={`flex items-center px-4 py-3.5 gap-3 hover:bg-gray-50/60 transition-colors ${
                        user.accountStatus === "deleted" ? "opacity-60" : ""
                      }`}
                    >
                      {/* Avatar + Name */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Image
                          src={user.profilePicUrl}
                          width={36}
                          height={36}
                          alt={user.username}
                          className="rounded-full shrink-0 w-9 h-9 object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.username}
                          </p>
                          <p className="text-xs text-gray-400 truncate md:hidden">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Email — md+ */}
                      <div className="hidden md:block w-52 min-w-0">
                        <p className="text-sm text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      {/* Joined — lg+ */}
                      <div className="hidden lg:block w-28 shrink-0">
                        <p className="text-sm text-gray-400">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Status badge — sm+ */}
                        <span
                          className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.badge}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                          />
                          {user.accountStatus}
                        </span>

                        {/* Status selector */}
                        <select
                          value={current}
                          onChange={(e) =>
                            handleStatusChange(user._id, e.target.value)
                          }
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400
                                     transition cursor-pointer"
                        >
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                          <option value="deleted">Deleted</option>
                        </select>

                        {/* Save button */}
                        <button
                          onClick={() => handleUpdate(user)}
                          disabled={!isDirty || isSaving}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition whitespace-nowrap
                            ${
                              isDirty
                                ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 active:scale-95 cursor-pointer"
                                : "bg-white text-gray-300 border-gray-200 cursor-not-allowed"
                            }`}
                        >
                          {isSaving ? (
                            <span className="flex items-center gap-1.5">
                              <svg
                                className="animate-spin w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8z"
                                />
                              </svg>
                              Saving
                            </span>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && filtered.length > 0 && (
          <p className="text-xs text-gray-400 text-right">
            Showing {filtered.length} of {counts.total} users
          </p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
