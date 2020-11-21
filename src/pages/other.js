import React, { useState } from "react"
import Layout from "../components/layout"
import Item from "../components/item"
import Toggle from "react-toggle"
import TrainingData from "../../content/training.yaml"
import ConferenceData from "../../content/conferences.yaml"
import AwardsData from "../../content/grants_awards.yaml"

import "react-toggle/style.css"

export default props => {
  const [showAllTraining, setShowAllTraining] = useState(false)
  const [showAllConferences, setShowAllConferences] = useState(false)

  function toggleShowAllTraining() {
    setShowAllTraining(!showAllTraining)
  }

  function toggleShowAllConferences() {
    setShowAllConferences(!showAllConferences)
  }

  const awards = AwardsData.map((item, index) => (
    <Item
      key={index}
      name={item.name}
      when={item.year}
      where=""
      org={item.description}
      moreInfo={item.rank || ""}
    />
  ))

  const training = TrainingData.filter(
    item => item.Selected === 1 || showAllTraining
  ).map((item, index) => (
    <Item
      key={index}
      name={item.Name}
      when={item.Year}
      where={item.City + ", " + item.Country}
      org={"by " + item.Teacher}
      moreInfo={item.moreInfo}
    />
  ))

  const conferences = ConferenceData.filter(
    item => item.Selected === 1 || showAllConferences
  ).map((item, index) => (
    <Item
      key={index}
      name={item.Name}
      when={item.Year}
      where={item.Location + ", " + item.Country}
      org={item.Role}
      moreInfo={item.moreInfo}
    />
  ))

  return (
    <Layout
      pageTitle="Other"
      pageDescription="Training, conferences, ..."
      showTitle={false}
    >
      <h3>Grants & Awards</h3>
      {awards}
      <h3 className="header-toggle">Training
        <span className="show-all-toggle">
          <span className="show-all-label">show all:</span>
            <Toggle defaultChecked={showAllTraining} onChange={toggleShowAllTraining} />
        </span>
      </h3>
      {training}

      <h3 className="header-toggle">Conferences
        <span className="show-all-toggle">
          <span className="show-all-label">show all:</span>
            <Toggle defaultChecked={showAllConferences} onChange={toggleShowAllConferences} />
        </span>
      </h3>

      {conferences}
    </Layout>
  )
}
