import React from "react"
import Layout from "../components/layout"
import Item from "../components/item"
import YAMLTrainingData from "../../content/training.yaml"

export default props => {

  const training = YAMLTrainingData.map((item, index) => (
    <Item
      key={index}
      name={item.Name}
      when={item.Year}
      where={(item.City + ", " + item.Country)}
      org={("by " + item.Teacher)}
      moreInfo={item.moreInfo}
    />
  ))

  return (
    <Layout
      pageTitle="Training"
      pageDescription="Courses and Training I've attended"
    >
      {training}
    </Layout>
  )
}
