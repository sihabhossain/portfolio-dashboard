"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BlogTable from "@/components/tables/BlogsTable";
import { useCreateBlog, useGetBlog } from "@/hooks/api/blog.hook";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    thumbnail: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // APIs for blogs
  const { mutate: createBlog } = useCreateBlog();
  const { data: blogs } = useGetBlog();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true); // Set loading state to true

    createBlog(formData, {
      onSuccess: () => {
        setFormData({ title: "", content: "", author: "", thumbnail: "" }); // Reset form fields
        setIsLoading(false); // Reset loading state
      },
      onError: () => {
        setIsLoading(false); // Reset loading state on error
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
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="author" className="text-gray-300 block">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="thumbnail" className="text-gray-300 block">
            Thumbnail URL
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className={`rounded px-4 py-2 text-white transition duration-200 ${
            isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-500"
          }`}
          disabled={isLoading} // Disable button while loading
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
