import React from "react"
import Layout from "../components/layout"
import Software from "../components/software"
import SoftwareData from "../../content/software.yaml"

export default props => {
    const software = SoftwareData.map((item, index) => (
      <Software
      key={index}
      name={item.name}
      when={item.year}
      description={item.description}
      badges={item.URLs}
    />
    ))


  return (
    <Layout pageTitle="Software" 
      pageDescription="Learn more about things I developped"
      showTitle={true}
    >
      {software}
    </Layout>
  )
}
