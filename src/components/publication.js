import React from "react"

const Publication = props => {
  return (
    <div className="publication-item">
      <p className="publication-title">{props.title || ""}. <span className="publication-journal-year">{props.journal || ""} ({props.year || ""})</span></p>
      <p className="publication-authors">{props.authors || ""}</p>
    </div>
  )
}

export default Publication
