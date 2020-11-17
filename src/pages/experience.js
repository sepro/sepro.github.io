import React from "react"
import Layout from "../components/layout"
import ExperienceData from "../../content/experience.yaml"
import EductationData from "../../content/education.yaml"

import SchoolIcon from "@material-ui/icons/School"
import WorkIcon from "@material-ui/icons/Work"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"

export default props => {
  function contentStyle(highlighted) {
    if (highlighted === 1) {
      return { background: "rgb(230, 138, 0)", color: "#fff" }
    } else {
      return { background: "rgb(221,221,221)", color: "#000" }
    }
  }

  function arrowStyle(highlighted) {
    if (highlighted === 1) {
      return { borderRight: "7px solid  rgb(230, 138, 0)" }
    } else {
      return { borderRight: "7px solid  rgb(221,221,221)" }
    }
  }

  const experience = ExperienceData.map((item, index) => (
    <VerticalTimelineElement
      key={index}
      className="vertical-timeline-element--work"
      contentStyle={contentStyle(item.highlight)}
      contentArrowStyle={arrowStyle(item.highlight)}
      date={item.when}
      iconStyle={contentStyle(item.highlight)}
      icon={<WorkIcon />}
    >
      <h3 className="vertical-timeline-element-title">{item.role}</h3>
      <h4 className="vertical-timeline-element-subtitle">
        {item.company} - {item.where}
      </h4>
      <p>{item.moreInfo}</p>
    </VerticalTimelineElement>
  ))

  const education = EductationData.map((item, index) => (
    <VerticalTimelineElement
      key={index}
      className="vertical-timeline-element--work"
      contentStyle={contentStyle(item.highlight)}
      contentArrowStyle={arrowStyle(item.highlight)}
      date={item.when}
      iconStyle={contentStyle(item.highlight)}
      icon={<SchoolIcon />}
    >
      <h3 className="vertical-timeline-element-title">
        {(item.degree || "") + " " + (item.major ? "in " + item.major : "")}
      </h3>
      <h4 className="vertical-timeline-element-subtitle">
        {item.school} - {item.where}
      </h4>
      <p>{item.moreInfo}</p>
    </VerticalTimelineElement>
  ))

  return (
    <Layout
      pageTitle="Experience & Education"
      pageDescription="Learn more about my experience"
      showTitle={true}
      >
      <VerticalTimeline layout="1-column-left">
        {experience}
        {education}
      </VerticalTimeline>
    </Layout>
  )
}
