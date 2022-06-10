import React from "react"
import CitationData from "../../content/citations.yaml"
import PublicationData from "../../content/publications.yaml"
import PatentData from "../../content/patents.yaml"

const Citations = props => {
  return (
    <div className="citations">
      {PatentData.length} patent, {PublicationData.length} publications, {CitationData.count}{" "}
      citations. H-index : {CitationData.hindex}
    </div>
  )
}

export default Citations
