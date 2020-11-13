import React from "react"
import CitationData from "../../content/citations.yaml"

const Citations = props => {
return (
  <div className="citations">
    {CitationData.publication_count} publications, {CitationData.count} citations. H-index : {CitationData.hindex} 
    <span className="citations-source"> ({CitationData.date} {CitationData.platform})</span>
  </div>)
}

export default Citations