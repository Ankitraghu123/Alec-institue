import React from "react";
import { Layout } from "../../layouts/Layout";
import { CoursesAllContainerSidebar } from "../../components/courses/CoursesAllContainerSidebar";
// import { CoursesAllGridSidebar } from "../../components/courses/CoursesAllGridSidebar";
import { CoursesAllList } from "../../components/courses/CoursesAllList";

export const Judgement = () => {
  return (
    <Layout

    >
      <CoursesAllContainerSidebar isGrid>
        <CoursesAllList />
      </CoursesAllContainerSidebar>
    </Layout>
  );
};
