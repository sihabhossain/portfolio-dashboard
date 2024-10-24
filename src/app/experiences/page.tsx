"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ExperienceTable from "@/components/tables/DeleteExpTable";
import { useCreateExp, useGetExp } from "@/hooks/api/experience.hook";
import React, { useState } from "react";

const ExperiencePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    span: "",
    desc: "",
    thumbnail: "", // Added thumbnail field
    company: "", // Added company field
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

  // APIs for experience
  const { mutate: createExperience } = useCreateExp();
  const { data: experiences } = useGetExp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    createExperience(formData, {
      onSuccess: () => {
        setFormData({
          title: "",
          span: "",
          desc: "",
          thumbnail: "",
          company: "",
        }); // Reset form fields
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <DefaultLayout>
      <h1 className="mb-4 text-2xl text-white">Add New Experience</h1>
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
          <label htmlFor="span" className="text-gray-300 block">
            Time Span
          </label>
          <input
            type="text"
            id="span"
            name="span"
            value={formData.span}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="desc" className="text-gray-300 block">
            Description
          </label>
          <textarea
            id="desc"
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
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
        <div>
          <label htmlFor="company" className="text-gray-300 block">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className={`rounded bg-graydark px-4 py-2 text-white transition duration-200 ${
            isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-500"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Add Experience"}
        </button>
      </form>

      {/* Experiences Table */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl text-white">Experiences</h2>
        <ExperienceTable experiences={experiences} />
      </div>
    </DefaultLayout>
  );
};

export default ExperiencePage;
