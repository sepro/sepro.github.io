import React from "react"
import CitationData from "../../content/citations.yaml"
import PublicationData from "../../content/publications.yaml"
import PatentData from "../../content/patents.yaml"
import { Assignment, Article, FormatQuote, TrendingUp } from "@mui/icons-material"

const Citations = props => {
  const patentText = PatentData.length === 1 ? "patent" : "patents";
  const publicationText = PublicationData.length === 1 ? "publication" : "publications";
  const citationText = CitationData.count === 1 ? "citation" : "citations";

  return (
    <div className="citations">
      <div className="citation-stats">
        <div className="citation-stat">
          <Assignment className="citation-icon" />
          <div className="citation-value">
            <span className="citation-number">{PatentData.length}</span>
            <span className="citation-label">{patentText}</span>
          </div>
        </div>
        <div className="citation-stat">
          <Article className="citation-icon" />
          <div className="citation-value">
            <span className="citation-number">{PublicationData.length}</span>
            <span className="citation-label">{publicationText}</span>
          </div>
        </div>
        <div className="citation-stat">
          <FormatQuote className="citation-icon" />
          <div className="citation-value">
            <span className="citation-number">{CitationData.count}</span>
            <span className="citation-label">{citationText}</span>
          </div>
        </div>
        <div className="citation-stat">
          <TrendingUp className="citation-icon" />
          <div className="citation-value">
            <span className="citation-number">{CitationData.hindex}</span>
            <span className="citation-label">H-index</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Citations
