import React from "react"
import Layout from "../components/layout"
import Skills from "../components/skills"

export default props => {

  return (
    <Layout pageTitle="Skills" 
      pageDescription="Learn more about my skills"
      showTitle={true}
    >
    <Skills />
    </Layout>
  )
}
