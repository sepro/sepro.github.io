import React, { useState } from "react";
import Layout from "../components/layout"
import Item from "../components/item"
import Toggle from 'react-toggle'
import YAMLTrainingData from "../../content/training.yaml"

import "react-toggle/style.css"

export default props => {
  const [showAll, setShowAll] = useState(false);

  function toggleShowAll() {
    setShowAll(!showAll)
  }


  const training = YAMLTrainingData.filter(item => item.Selected === 1 || showAll).map((item, index) => (
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
      <div className="show-all-toggle">
        <div className='show-all-label'>show all:</div>
        <div className='show-all-switch'>
          <Toggle
            defaultChecked={showAll} 
            onChange={toggleShowAll} />
        </div>
      </div>
      { training }
    </Layout>
  )
}
