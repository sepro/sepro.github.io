import React from "react"

const Badge = props => {
  return (
  <a href={props.link} className="badge">{props.children}</a>
  )
}

export default Badge
