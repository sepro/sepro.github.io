import React from "react"
import MicIcon from "@material-ui/icons/Mic"
import CameraAltIcon from "@material-ui/icons/CameraAlt"
import VideocamIcon from "@material-ui/icons/Videocam"

const MediaItem = props => {
  function mediaIcon(icon_type) {
    if (icon_type === "microphone") {
      return <MicIcon className="media-icon" />
    } else if (icon_type === "camera") {
      return <CameraAltIcon className="media-icon" />
    } else if (icon_type === "video-camera") {
      return <VideocamIcon className="media-icon" />
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
        <a href={props.link}><img className="media-image" src={props.image} alt={props.description} /></a>
      </div>
    </div>
  )
}

export default MediaItem
