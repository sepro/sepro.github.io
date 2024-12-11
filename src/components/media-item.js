import React from "react"
import { CameraAlt, Mic, Videocam } from "@mui/icons-material"

const MediaItem = (props) => {
  function mediaIcon(icon_type) {
    if (icon_type === "microphone") {
      return <Mic className="media-icon" />
    } else if (icon_type === "camera") {
      return <CameraAlt className="media-icon" />
    } else if (icon_type === "video-camera") {
      return <Videocam className="media-icon" />
    } else {
      return ""
    }
  }

  return (
    <div className="media-item" data-sal="fade">
      <h3 className="banner media-title cut-corner-tr-bl">
        {mediaIcon(props.icon)} {props.medium}
      </h3>
      <p className="media-description">{props.description}</p>
      <div className="media-image-container">
        <a href={props.link}>
          <img
            className="media-image"
            src={props.image}
            alt={props.description}
          />
        </a>
      </div>
    </div>
  )
}

export default MediaItem
