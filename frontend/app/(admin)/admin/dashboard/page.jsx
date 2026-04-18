"use client";
import Header from "@/components/UserDashboard/Header";
import Sidebar from "@/components/AdminDashboard/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/Store/AuthStore";
import EditProfile from "@/components/UserDashboard/EditProfile";
import AllPost from "@/components/AdminDashboard/AllPost";
import ViewPost from "@/components/AdminDashboard/ViewPost";
import AllUsers from "@/components/AdminDashboard/AllUsers";
import ReportedPosts from "@/components/AdminDashboard/ReportedPosts";

const Page = () => {
  const { user } = useAuthStore();
  const [active, setActive] = useState("All Post");
  const selectedPostId = useRef(null);

  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state?.tab) {
        setActive(e.state.tab);
        if (e.state.postId) selectedPostId.current = e.state.postId;
      } else {
        setActive("All Posts");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSetActive = (component) => {
    setActive(component);
    window.history.pushState(
      // pushState adds history entry
      { tab: component },
      "",
      `/admin/dashboard/?tab=${component.toLowerCase().replace(" ", "-")}`,
    );
  };

  const handleViewPost = (id) => {
    selectedPostId.current = id;
    setActive("View Post");
    window.history.pushState(
      { tab: "View Post", postId: id }, // ← store id in history state
      "",
      `/admin/dashboard?tab=view-post&id=${id}`,
    );
  };

  // add this guard
  if (!user) return null;

  const renderComponent = () => {
    switch (active) {
      case "All Post":
        return (
          <AllPost
            active={active}
            setActive={setActive}
            onViewPost={handleViewPost}
          />
        );
      case "All Users":
        return <AllUsers />;
      case "Reported Posts":
        return <ReportedPosts />;
      case "Edit Profile":
        return <EditProfile />;
      case "View Post":
        return <ViewPost postId={selectedPostId.current} />;
      default:
        return (
          <AllPost
            active={active}
            setActive={setActive}
            onViewPost={handleViewPost}
          />
        );
    }
  };

  return (
    <section className="flex h-screen max-h-screen my-0 overflow-hidden">
      <Sidebar active={active} setActive={handleSetActive} />
      <div className="flex flex-col flex-1 h-full overflow-hidden min-w-0">
        <Header />
        <div className="flex-1 overflow-y-auto min-h-0 pb-10 sm:pb-0">
          {renderComponent()}
        </div>
      </div>
    </section>
  );
};

export default Page;
