"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Skill } from "@/types"; // Adjust the path as needed
import SkillsTable from "@/components/tables/SkillsTable";
import { useCreateSkill, useGetSkills } from "@/hooks/api/skills.hook";

const SkillsPage: React.FC = () => {
  const [formData, setFormData] = useState<Skill>({
    name: "",
    level: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // api
  const { mutate: createSkill } = useCreateSkill();
  const { data: skills } = useGetSkills();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createSkill(formData);
  };

  return (
    <DefaultLayout>
      <h1 className="mb-4 text-2xl text-white">Add a New Skill</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 space-y-4 rounded-lg p-6 shadow-md"
      >
        <div>
          <label htmlFor="name" className="text-gray-300 block">
            Skill Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="text-gray-300 block">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border-gray-600 bg-gray-900 w-full rounded border bg-graydark p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-500"
        >
          Add Skill
        </button>
      </form>

      {/* Skills Table */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl text-white">Skills</h2>
        <SkillsTable skills={skills} /> {/* Pass handleDelete as a prop */}
      </div>
    </DefaultLayout>
  );
};

export default SkillsPage;
