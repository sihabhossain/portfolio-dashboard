"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProjectsTable from "@/components/tables/ProjectsTable";
import { useCreateProject, useGetProjects } from "@/hooks/api/projects.hook";
import React, { useState } from "react";

const ProjectsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    des: "",
    img: "",
    link: "",
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

  // APIs for projects
  const { mutate: createProject } = useCreateProject();
  const { data: projects } = useGetProjects();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    createProject(formData, {
      onSuccess: () => {
        setFormData({ title: "", des: "", img: "", link: "" }); // Reset form fields
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <DefaultLayout>
      <h1 className="mb-4 text-2xl text-white">Create a New Project</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 space-y-4 rounded-lg p-6 shadow-md"
      >
        <div>
          <label htmlFor="title" className="text-gray-300 block">
            Project Title
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
          <label htmlFor="des" className="text-gray-300 block">
            Description
          </label>
          <textarea
            id="des"
            name="des"
            value={formData.des}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="img" className="text-gray-300 block">
            Image URL
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="link" className="text-gray-300 block">
            Project Link
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
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
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>

      {/* Projects Table */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl text-white">Projects</h2>
        <ProjectsTable projects={projects} />
      </div>
    </DefaultLayout>
  );
};

export default ProjectsPage;
