import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Define the API endpoint
const API_URL = 'http://localhost:8000/api/projects'; // Adjust the URL based on your backend setup



// Custom hook for creating a project
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation(useCreateProject, {
    onSuccess: () => {
      // Invalidate and refetch the projects list after a new project is created
      queryClient.invalidateQueries(['projects']);
    },
    onError: (error: any) => {
      console.error('Error creating project:', error);
    },
  });
};
