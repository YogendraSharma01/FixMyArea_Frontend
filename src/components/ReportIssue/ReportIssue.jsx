import React, { useState } from "react";
import "./ReportIssue.css";
import herobg from '../../assets/images/hero-bg.png'
const ReportIssue = () => {
  // State hooks for form data
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("low");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      issueTitle,
      issueDescription,
      category,
      priority,
    };
    console.log("Form Data Submitted: ", formData);
    // You can send this data to your server or API here.
  };

  return (
    <div
  className="font-sans flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${herobg})` }}
>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-10 mb-10">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Report an Issue
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Issue Title */}
          <div className="mb-4">
            <label
              htmlFor="issue-title"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Issue Title
            </label>
            <input
              type="text"
              id="issue-title"
              name="issue-title"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter issue title"
              required
            />
          </div>

          {/* Issue Description */}
          <div className="mb-4">
            <label
              htmlFor="issue-description"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Issue Description
            </label>
            <textarea
              id="issue-description"
              name="issue-description"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Describe the issue in detail"
              required
            ></textarea>
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                Select category
              </option>
              <option value="bug">Potholes</option>
              <option value="feature">Broken Street Light</option>
              <option value="question">Sewage Overflow</option>
              <option value="feature">Broken Street Light</option>
              <option value="feature">Illegal Waste Dumping</option>
              <option value="feature">Damaged Trafic Signals</option>
              <option value="feature">Unclean Public Toilets</option>

              <option value="feature">Broken Street Light</option>
            </select>
          </div>

          {/* Attachment upload */}
          <>
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Photo of the Issue
            </label>

            <div className="relative">
              <label
                htmlFor="file"
                className="flex min-h-[175px] w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-primary p-6"
              >
                <div>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="sr-only"
                  />
                  <span className="mx-auto mb-3 flex h-[50px] w-[50px] items-center justify-center rounded-full border border-stroke dark:border-dark-3 bg-white dark:bg-dark-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.5013 11.666C2.96154 11.666 3.33464 12.0391 3.33464 12.4993V15.8327C3.33464 16.0537 3.42243 16.2657 3.57871 16.4219C3.73499 16.5782 3.94695 16.666 4.16797 16.666H15.8346C16.0556 16.666 16.2676 16.5782 16.4239 16.4219C16.5802 16.2657 16.668 16.0537 16.668 15.8327V12.4993C16.668 12.0391 17.0411 11.666 17.5013 11.666C17.9615 11.666 18.3346 12.0391 18.3346 12.4993V15.8327C18.3346 16.4957 18.0712 17.1316 17.6024 17.6004C17.1336 18.0693 16.4977 18.3327 15.8346 18.3327H4.16797C3.50493 18.3327 2.86904 18.0693 2.4002 17.6004C1.93136 17.1316 1.66797 16.4957 1.66797 15.8327V12.4993C1.66797 12.0391 2.04106 11.666 2.5013 11.666Z"
                        fill="#3056D3"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.41074 1.91009C9.73618 1.58466 10.2638 1.58466 10.5893 1.91009L14.7559 6.07676C15.0814 6.4022 15.0814 6.92984 14.7559 7.25527C14.4305 7.58071 13.9028 7.58071 13.5774 7.25527L10 3.67786L6.42259 7.25527C6.09715 7.58071 5.56951 7.58071 5.24408 7.25527C4.91864 6.92984 4.91864 6.4022 5.24408 6.07676L9.41074 1.91009Z"
                        fill="#3056D3"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.0013 1.66602C10.4615 1.66602 10.8346 2.03911 10.8346 2.49935V12.4994C10.8346 12.9596 10.4615 13.3327 10.0013 13.3327C9.54106 13.3327 9.16797 12.9596 9.16797 12.4994V2.49935C9.16797 2.03911 9.54106 1.66602 10.0013 1.66602Z"
                        fill="#3056D3"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-base text-body-color dark:text-dark-6">
                    Drag &amp; drop or
                    <span className="text-primary underline"> browse </span>
                  </span>
                </div>
              </label>
            </div>
          </>

          {/* Priority Radio Buttons */}
          <div className="mb-5 mt-5">
            <span className="block text-gray-600 text-sm font-semibold mb-2">
              Priority
            </span>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={priority === "low"}
                  onChange={() => setPriority("low")}
                  className="mr-2"
                />
                <span className="text-gray-600">Low</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={priority === "medium"}
                  onChange={() => setPriority("medium")}
                  className="mr-2"
                />
                <span className="text-gray-600">Medium</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priority === "high"}
                  onChange={() => setPriority("high")}
                  className="mr-2"
                />
                <span className="text-gray-600">High</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
