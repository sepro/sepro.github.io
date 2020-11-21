import React from "react"
import Layout from "../components/layout"
import Skills from "../components/skills"
import Languages from "../components/languages"

export default props => {

  return (
    <Layout pageTitle="Skills and Languages" 
      pageDescription="Learn more about my skills"
      showTitle={false}
    >
      <h3>Languages</h3>
      <Languages />
      <h3>Skills</h3>
      <Skills />
    </Layout>
  )
}
