import { useDeleteBlog } from "@/hooks/api/blog.hook";
import { BlogTableProps } from "@/types";
import React from "react";
import toast from "react-hot-toast";

const BlogTable: React.FC<BlogTableProps> = ({ blogs }) => {
  const { mutate: deleteBlog } = useDeleteBlog();

  const handleDelete = (id: string | undefined) => {
    if (id) {
      deleteBlog(id);
    } else {
      toast.error("Blog ID is required to delete the blog.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="divide-gray-700 bg-gray-800 min-w-full divide-y rounded-lg shadow-md">
        <thead className="bg-gray-900">
          <tr>
            <th className="text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Title
            </th>

            <th className="text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Content
            </th>
            <th className="text-gray-300 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-gray-700 divide-y">
          {blogs?.map((blog, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                {blog.title}
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                <button
                  onClick={() => handleDelete(blog?._id)}
                  className="bg-red-600 hover:bg-red-500 rounded px-4 py-2 text-white transition duration-200"
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

export default BlogTable;
