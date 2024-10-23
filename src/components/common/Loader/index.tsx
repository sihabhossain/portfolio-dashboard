import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Loader = () => {
  return (
    <DefaultLayout>
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    </DefaultLayout>
  );
};

export default Loader;
