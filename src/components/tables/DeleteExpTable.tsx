"use client";

import { useDeleteExp } from "@/hooks/api/experience.hook";
import { ExperienceTableProps } from "@/types";
import React from "react";
import toast from "react-hot-toast";


const ExperienceTable: React.FC<ExperienceTableProps> = ({ experiences }) => {
  const { mutate: deleteExperience } = useDeleteExp();

  const handleDelete = (id: string | undefined) => {
    if (id) {
      deleteExperience(id);
    } else {
      toast.error("Experience ID is required to delete the experience.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="bg-gray-800 min-w-full rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700 text-gray-200">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Time Span</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {experiences?.map((experience) => (
            <tr key={experience._id} className="hover:bg-gray-600">
              <td className="p-4">{experience.title}</td>
              <td className="p-4">{experience.span}</td>
              <td className="p-4">{experience.desc}</td>
              <td className="p-4">
                <button
                  onClick={() => handleDelete(experience._id)}
                  className="bg-red-600 hover:bg-red-500 rounded px-2 py-1 text-white transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExperienceTable;
