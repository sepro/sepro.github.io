import React from "react"
import Layout from "../components/layout"
import Item from "../components/item"
import EductationData from "../../content/education.yaml"

export default props => {

  const education = EductationData.map((item, index) => (
    <Item
      key={index}
      name={(item.degree || "") + " " + (item.major ? "in " + item.major : "")}
      when={item.when}
      where={item.where}
      org={item.school}
      moreInfo={item.moreInfo}
    />
  ))

  return (
    <Layout
      pageTitle="Education"
      pageDescription="Overview of the places I studied"
    >
      {education}
    </Layout>
  )
}
