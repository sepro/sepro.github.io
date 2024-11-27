import React from "react"

const Item = (props) => {
  return (
    <div className="item">
      <div className="item-row">
        <span className="item-name">{props.name || ""}</span>
        <span className="item-when">{props.when || ""}</span>
      </div>
      <div className="item-row">
        <span className="item-org">{props.org || ""}</span>
        <span className="item-where">{props.where || ""}</span>
      </div>
      <div
        className="item-more-info"
        dangerouslySetInnerHTML={{ __html: props.moreInfo }}
      />
    </div>
  )
}

export default Item
