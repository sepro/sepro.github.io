import React from "react"

const PageHeader = props => {
  if (props.showTitle) {
    return <h2 className="page-header">{props.title}</h2>
  }
   else {
     return ""
   }
}

export default PageHeader
