"use client";
import Dashboard from "@/components/UserDashboard/Dashboard";
import Header from "@/components/UserDashboard/Header";
import Sidebar from "@/components/UserDashboard/Sidebar";
import AddPost from "@/components/UserDashboard/AddPost";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/Store/AuthStore";
import EditPost from "@/components/UserDashboard/EditPost";
import EditProfile from "@/components/UserDashboard/EditProfile";
import Chatbot from "@/components/UserDashboard/Chatbot";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useAuthStore();
  const [active, setActive] = useState("Dashboard");
  const selectedPostId = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state?.tab) {
        setActive(e.state.tab);
        if (e.state.postId) selectedPostId.current = e.state.postId;
      } else {
        setActive("Dashboard");
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
      `/profile?tab=${component.toLowerCase().replace(" ", "-")}`,
    );
  };

  const handleEditPost = (id) => {
    selectedPostId.current = id;
    setActive("Edit Post");
    window.history.pushState(
      { tab: "Edit Post", postId: id }, // ← store id in history state
      "",
      `/profile?tab=edit-post&id=${id}`,
    );
  };

  // add this guard
  if (!user) return null;

  const renderComponent = () => {
    switch (active) {
      case "Dashboard":
        return (
          <Dashboard
            active={active}
            setActive={setActive}
            onEditPost={handleEditPost}
          />
        );
      case "Edit Profile":
        return <EditProfile />;
      case "Add Post":
        return <AddPost />;
      case "Edit Post":
        return <EditPost postId={selectedPostId.current} />;
      case "Chatbot":
        return <Chatbot />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <section className="flex h-screen max-h-screen my-0 overflow-hidden">
      <Sidebar active={active} setActive={handleSetActive} />
      <div className="flex flex-col flex-1 h-full overflow-hidden min-w-0">
        <Header />
        <div className="flex-1 overflow-y-auto min-h-0">
          {renderComponent()}
        </div>
      </div>
    </section>
  );
};

export default Page;
