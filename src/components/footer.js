import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = props => {
  const data = useStaticQuery(graphql`
    query {
      currentBuildDate {
        currentDate
      }
    }
  `)

  return (
    <div id="footer">
      <div className="row">
        <div className="column">
          <p id="cp">
            &copy; {props.name} | Last Update:{" "}
            <span className="date-highlighted">
              {data.currentBuildDate.currentDate}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
