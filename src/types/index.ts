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
  title: string;
  span: string;
  desc: string;
  className: string;
  thumbnail?: string;
  company: string;
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
