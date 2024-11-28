import React from "react"
import Layout from "../components/layout"

const Error = () => {
  return (
    <Layout pageTitle="Page Not Found!" pageDescription="">
      <p>Ooops! Wrong turn!</p>
      <p>
        Head back to the <a href="/">Home</a> page
      </p>
    </Layout>
  )
}

export default Error
