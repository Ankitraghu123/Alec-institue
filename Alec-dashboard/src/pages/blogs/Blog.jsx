import React from "react";
import { Layout } from "../../layouts/Layout";
import { BlogAll } from "../../components/blogs/BlogAll";

export const Blog = () => {
  return (
   <Layout header={9} footer={1}>
      <BlogAll />
    </Layout>
  );
};
