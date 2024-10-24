"use client";

import React from "react";
import { Project, ProjectsTableProps } from "@/types"; // Adjust the path as needed
import toast from "react-hot-toast";
import { useDeleteProject } from "@/hooks/api/projects.hook";

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
  const { mutate: deleteProject } = useDeleteProject();

  const handleDelete = (id: string | undefined) => {
    if (id) {
      deleteProject(id);
    } else {
      toast.error("Project ID is required to delete the project.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="bg-gray-800 min-w-full rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700 text-gray-200">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Description</th>

            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {projects?.map((project) => (
            <tr key={project.title} className="hover:bg-gray-600">
              <td className="p-4">{project.title}</td>
              <td className="p-4">{project.des}</td>

              <td className="p-4">
                <button
                  onClick={() => handleDelete(project?._id)}
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

export default ProjectsTable;
