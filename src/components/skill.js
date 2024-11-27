import React from "react"

const Skill = (props) => {
  return (
    <div className="item-table skill-table">
      <div className="item-row skill-row">
        <span className="item-name">{props.name || ""}</span>
        <span className="item-when">{props.experience || ""}&nbsp;</span>
      </div>
      <div className="item-row">
        <div className="item-name" colSpan={2}>
          <div className="skill-meter-wrapper">
            <div
              className="skill-meter"
              style={{ width: props.level + "%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skill
