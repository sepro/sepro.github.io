import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          buildTime
        }
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
              {new Date(data.site.siteMetadata.buildTime).toLocaleDateString("en-GB")}{" "}
              {new Date(data.site.siteMetadata.buildTime).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
