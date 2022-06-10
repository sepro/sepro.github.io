import React from "react"
import Layout from "../components/layout"
import MediaItem from "../components/media-item"
import MediaData from "../../content/media.yaml"

export default props => {
  const media_items = MediaData.map((item, index) => (
    <MediaItem
      key={index}
      medium={item.medium}
      description={item.description}
      icon={item.icon}
      year={item.year}
      data={item.data}
      image={item.image}
      link={item.link}
    />
  ))

  return (
    <Layout pageTitle="Media" 
      pageDescription="my apprearances in the media"
      showTitle={true}
    >
      {media_items}
    </Layout>
  )
}
