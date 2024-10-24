"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BlogTable from "@/components/tables/BlogsTable";
import { useCreateBlog, useGetBlog } from "@/hooks/api/blog.hook";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import styles for Quill editor

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "", // Content for the rich text editor
    author: "",
    thumbnail: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      content: value, // Set content for the rich text editor
    }));
  };

  // APIs for blogs
  const { mutate: createBlog } = useCreateBlog();
  const { data: blogs } = useGetBlog();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    createBlog(formData, {
      onSuccess: () => {
        setFormData({ title: "", content: "", author: "", thumbnail: "" });
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <DefaultLayout>
      <h1 className="mb-4 text-2xl text-white">Create a New Blog Post</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 space-y-4 rounded-lg p-6 shadow-md"
      >
        <div>
          <label htmlFor="title" className="text-gray-300 block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="text-gray-300 block">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleEditorChange}
            className="bg-gray-900 text-white"
          />
        </div>

        <button
          type="submit"
          className={`rounded px-4 py-2 text-white transition duration-200 ${
            isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-500"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Blog"}
        </button>
      </form>

      {/* Blog Table */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl text-white">Blog Posts</h2>
        <BlogTable blogs={blogs} />
      </div>
    </DefaultLayout>
  );
};

export default Page;
