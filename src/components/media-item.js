import React from "react"
import MicIcon from "./icon/MicIcon"
import CamIcon from "./icon/CameraIcon"
import VideoCamIcon from "./icon/VideoCamIcon"

const MediaItem = (props) => {
  function mediaIcon(icon_type) {
    if (icon_type === "microphone") {
      return <MicIcon />
    } else if (icon_type === "camera") {
      return <CamIcon />
    } else if (icon_type === "video-camera") {
      return <VideoCamIcon />
    } else {
      return ""
    }
  }

  return (
    <div className="media-item" data-sal="fade">
      <h3 className="media-title">
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
