import { useUserActions } from "@/Store/UserAction";
import { useEffect, useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ReportPostModal = ({ isVisible, setIsVisible, postId }) => {
  const { reportPost, isLoading } = useUserActions();
  const [reportData, setReportData] = useState({
    reason: "",
    description: "",
  });

  // To stop scrolling if this modal is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  const handleChange = (e) =>
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async () => {
    await reportPost({
      targetId: postId,
      reason: reportData.reason,
      description: reportData.description,
    });
  };
  return (
    <div
      className={`fixed inset-0 px-2 py-10 sm:p-10 w-screen h-full bg-black/40 ${isVisible ? "flex" : "hidden"} flex justify-center items-start`}
    >
      <div className="w-full sm:w-9/12 bg-white rounded-2xl relative">
        <IoMdClose
          className="absolute text-primary right-2 top-2 text-3xl transition-all duration-500 ease-in-out hover:rotate-180"
          onClick={() => setIsVisible((prev) => !prev)}
        />

        <div className="mt-15 flex items-center flex-col w-full">
          <div className="flex flex-col gap-2 px-4 py-2 sm:px-10 w-full">
            <label className="text-primary">Reason</label>
            <select
              name="reason"
              id=""
              value={reportData.reason}
              onChange={handleChange}
              className="border border-primary outline-none rounded-md py-2 px-4 w-full"
            >
              <option value="" disabled>
                Select a reason
              </option>
              <option value="misleading_information">
                Misleading Information
              </option>
              <option value="illegal_animal_sale">
                Selling animals illegally
              </option>
              <option value="spam_or_advertisement">
                Spam or advertisement
              </option>
              <option value="inappropriate_content">
                Inappropriate content
              </option>
              <option value="scam_or_fake_adoption">
                Scam or fake adoption post
              </option>
              <option value="prohibited_animals">
                Posting prohibited animals
              </option>
              <option value="other">Others</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 px-4 py-2 sm:px-10 w-full">
            <label className="text-primary">Description (Optional)</label>
            <textarea
              name="description"
              rows={8}
              value={reportData.description}
              onChange={handleChange}
              className="border border-primary outline-none rounded-md p-4 resize-none w-full"
            />
            {/* Button */}
            <button
              className="primary-btn px-10 py-2 w-full rounded-full my-6 text-lg"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <FaCircleNotch className="animate-spin text-lg" />
              ) : (
                "Report Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPostModal;
