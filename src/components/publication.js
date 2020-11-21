import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Badge from "./badge"

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
  let highlighted_author =
    '<span class="author-highlighted">' + publication_highlight + "</span>"
  let authors = props.authors.replace(publication_highlight, highlighted_author)

  const badges = props.badges.map((item, index) => (
    <Badge 
      key={props.key + '_' + index}
      link={item.link}>
        {item.name}
    </Badge>
  ))

  return (
    <div className="publication-item" data-sal="fade">
      <p className="publication-title">
        { props.preprint === 1 ? <span className="publication-preprint">[preprint] </span> : "" }{props.title}.
        <span className="publication-journal-year">
          {" " + props.journal || ""} ({props.year || ""})
        </span>
      </p>
      <p><span
        className="publication-authors"
        dangerouslySetInnerHTML={{ __html: authors }}
      ></span></p>
      {badges}
    </div>
  )
}

export default Publication
