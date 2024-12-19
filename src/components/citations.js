import React from "react"
import CitationData from "../../content/citations.yaml"
import PublicationData from "../../content/publications.yaml"
import PatentData from "../../content/patents.yaml"

const Citations = props => {
  const patentText = PatentData.length === 1 ? "patent" : "patents";
  const publicationText = PublicationData.length === 1 ? "publication" : "publications";
  const citationText = CitationData.count === 1 ? "citation" : "citations";

  return (
    <div className="citations">
      {PatentData.length} {patentText}, {PublicationData.length} {publicationText}, {CitationData.count} {citationText}. H-index : {CitationData.hindex}
    </div>
  )
}

export default Citations
