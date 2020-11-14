import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Publication = props => {
  const data = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        publication_highlight
      }
    }
  }
  `)

  let publication_highlight = data.site.siteMetadata.publication_highlight
  let highlighted_author = "<span class=\"author-highlighted\">"+publication_highlight+"</span>"
  let authors = props.authors.replace(publication_highlight, highlighted_author) 

  return (
    <div className="publication-item">
      <p className="publication-title">{props.title }. <span className="publication-journal-year">{props.journal || ""} ({props.year || ""})</span></p>
      <p className="publication-authors" dangerouslySetInnerHTML={{__html: authors}}></p>
    </div>
  )
}

export default Publication
