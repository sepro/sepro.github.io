import React from "react"
import Layout from "../components/layout"
import ExperienceData from "../../content/experience.yaml"

import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

export default props => {

  const experience = ExperienceData.map((item, index) => (
      <VerticalTimelineElement
      key={index}
      className="vertical-timeline-element--work"
      contentStyle={{ background: 'rgb(230, 138, 0)', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(230, 138, 0)' }}
      date={item.when}
      iconStyle={{ background: 'rgb(230, 138, 0)', color: '#fff' }}
      icon={<WorkIcon />}
    >
      <h3 className="vertical-timeline-element-title">{item.role}</h3>
      <h4 className="vertical-timeline-element-subtitle">{item.company} - {item.where}</h4>
      <p>
      {item.moreInfo}
      </p>
    </VerticalTimelineElement>
  ))

  return (
    <Layout
      pageTitle="Experience"
      pageDescription="Learn more about my experience"
    >
      <VerticalTimeline layout="1-column-left">
      {experience}
      </VerticalTimeline>
    </Layout>
  )
}
