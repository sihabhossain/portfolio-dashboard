export type TUserData = {
  name?: string;
  email: string;
  password: string;
  mobileNumber?: string;
  profilePhoto?: string;
};

export type TProject = {
  title: string;
  des: string;
  img: string;
  iconLists?: string[];
  link: string;
};

export type TExperience = {
  _id?: string;
  title: string;
  span: string;
  desc: string;
};

export type TBlogPost = {
  _id?: string | undefined;
  title: string;
  content: string;
  author: string;
  thumbnail: string;
};

export interface BlogTableProps {
  blogs: TBlogPost[];
}

export interface Project {
  _id?: string;
  title: string;
  des: string;
  img: string;
  link: string;
}

export interface ProjectsTableProps {
  projects: Project[];
}

export interface Skill {
  _id?: string;
  name: string;
  level: string;
  description: string;
}

// types.ts
export interface TSkill {
  _id?: string; // Unique identifier for each skill
  name: string; // Name of the skill
  level: string; // Level of proficiency (e.g., "Beginner", "Intermediate", "Advanced")
  description: string; // A brief description of the skill
}

export interface ExperienceTableProps {
  experiences: TExperience[];
}
