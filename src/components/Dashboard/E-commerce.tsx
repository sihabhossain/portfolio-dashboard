"use client";

import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";

const HomePage: React.FC = () => {
  return (
    <>
      <DefaultLayout>
        <div className="welcome-container py-10 text-center">
          <h1 className="text-gray-900 mb-4 text-4xl font-bold dark:text-white">
            Welcome to Our Dashboard!
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            We're glad to have you here. Explore our features and manage your
            account seamlessly.
          </p>
        </div>
      </DefaultLayout>
    </>
  );
};

export default HomePage;
