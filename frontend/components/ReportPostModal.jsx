import React from "react";
import { IoMdClose } from "react-icons/io";

const ReportPostModal = ({ isVisible, setIsVisible }) => {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 w-screen h-full bg-black/40 ${isVisible ? "flex" : "hidden"} flex justify-center items-start`}
    >
      <div className="w-9/12 bg-white rounded-2xl relative">
        <IoMdClose
          className="absolute text-primary right-2 top-2 text-3xl transition-all duration-500 ease-in-out hover:rotate-180"
          onClick={() => setIsVisible((prev) => !prev)}
        />

        <div className="mt-15 flex items-center flex-col w-full">
          <div className="flex flex-col gap-2 py-2 px-10 w-full">
            <label className="text-primary">Reason</label>
            <select
              name="reason"
              id=""
              className="border border-primary outline-none rounded-md py-2 px-4 w-full"
            >
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

          <div className="flex flex-col gap-2 py-2 px-10 w-full">
            <label className="text-primary">Description (Optional)</label>
            <textarea
              type="text"
              rows={8}
              cols={30}
              className="border border-primary outline-none rounded-md p-4 resize-none w-full"
            />
          </div>
          {/* Button */}
          <button className="primary-btn py-2 rounded-full my-6 text-lg">
            Request to adopt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPostModal;
