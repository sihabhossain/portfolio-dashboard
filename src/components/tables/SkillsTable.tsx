import React from "react";
import { Skill } from "@/types"; // Adjust the path as needed
import toast from "react-hot-toast";
import { useDeleteSkill } from "@/hooks/api/skills.hook";

interface SkillsTableProps {
  skills: Skill[];
}

const SkillsTable: React.FC<SkillsTableProps> = ({ skills }) => {
  const { mutate: deleteSkills } = useDeleteSkill();

  const handleDelete = (id: string | undefined) => {
    if (id) {
      deleteSkills(id);
    } else {
      toast.error("skills ID is required to delete the skills.");
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="bg-gray-800 min-w-full rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700 text-gray-200">
            <th className="p-4 text-left">Skill Name</th>
            <th className="p-4 text-left">Level</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300">
          {skills?.map((skill) => (
            <tr key={skill.name} className="hover:bg-gray-600">
              <td className="p-4">{skill.name}</td>
              <td className="p-4">{skill.level}</td>
              <td className="p-4">{skill.description}</td>
              <td className="p-4">
                <button
                  onClick={() => handleDelete(skill?._id)} // Call onDelete with skill name
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

export default SkillsTable;
