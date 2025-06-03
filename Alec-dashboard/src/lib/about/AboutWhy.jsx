import React from "react";
import { Layout } from "../../layouts/Layout";
import { AboutTwo } from "../../components/about/AboutTwo";

import { BlogOne } from "../../components/blogs/BlogOne";

export const AboutWhy = () => {
  return (
    <Layout header={9} footer={1}>
      {/* about */}
      <AboutTwo />


      {/* blog */}
      <BlogOne />
    </Layout>
  );
};
