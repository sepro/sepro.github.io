import React from "react"
import Layout from "../components/layout"
import Software from "../components/software"
import { Code } from "@mui/icons-material"
import SoftwareData from "../../content/software.yaml"
import OpensourceData from "../../content/opensource.yaml"

const Softwares = () => {
  const software = SoftwareData.map((item, index) => (
    <Software
      key={index}
      name={item.name}
      when={item.year}
      description={item.description}
      badges={item.URLs}
    />
  ))

  const opensource= OpensourceData.map((item, index) => (
    <Software
      key={index}
      name={item.name}
      when={item.year}
      description={item.description}
      badges={item.URLs}
    />
  ))


  return (
    <Layout
      pageTitle="Software"
      pageDescription="Learn more about things I developped"
      showTitle={true}
    >
      {software}

      <h3 className="banner cut-corner-tr-bl"><Code className="media-icon" /> Open Source Contributions</h3>
      <div className="text-section">
        {opensource}
      </div>
    </Layout>
  )
}

export default Softwares
