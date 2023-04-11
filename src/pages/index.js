import * as React from "react";
import "../style/bulmacustom.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "../components/layout";

const IndexPage = () => {
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
