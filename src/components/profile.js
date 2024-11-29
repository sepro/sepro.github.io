import React from "react"
import profile_photo from "../../static/profile.jpg"
import { SocialIcon } from "react-social-icons"

const Profile = props => {
  const socialIcons = props.socialMedia.map((item, index) => (
    <SocialIcon
      key={index}
      url={item.link}
      style={{ height: 32, width: 32 }}
    />
  ))
  return (
    <>
      <img src={profile_photo} alt={props.name} id="profile-img" width="200" height="200" />
      <div id="profile-info-wrapper">
        <h4 id="profile-name">{props.name}</h4>
        <h6 id="profile-role">{props.role}</h6>
        <p id="profile-email">
          <a href={"mailto:" + props.email}>{props.email || ""}</a>
        </p>
      </div>
      <div id="social-icons-wrapper">{socialIcons}</div>
    </>
  )
}

export default Profile
