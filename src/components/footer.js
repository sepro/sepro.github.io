import React from "react"

const Footer = props => {
  return (
    <div id="footer">
      <div className="row">
        <div className="column">
          <p id="cp">&copy; {props.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
