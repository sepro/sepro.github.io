import React from "react"
import Layout from "../components/layout"
import Item from "../components/item"
import ExperienceData from "../../content/experience.yaml"

export default props => {

  const experience = ExperienceData.map((item, index) => (
    <Item
      key={index}
      name={item.role}
      when={item.when}
      where={item.where}
      org={item.company}
      moreInfo={item.moreInfo}
    />
  ))

  return (
    <Layout
      pageTitle="Experience"
      pageDescription="Learn more about my experience"
    >
      {experience}
    </Layout>
  )
}
