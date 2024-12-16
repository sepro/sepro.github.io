import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Menu from "./menu"
import Profile from "./profile"
import PageHeader from "./page-header"
import Footer from "./footer"
import Skills from "./skills"
import Languages from "./languages"
import profile_photo from "../../static/profile.png"
import { Helmet } from "react-helmet"

const Layout = (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          name
          role
          email
          socialMedia {
            name
            link
          }
          theme
          font
        }
      }
    }
  `)

  const theme = data.site.siteMetadata.theme || "great-gatsby"
  const font = data.site.siteMetadata.font || "default"
  return (
    <>
      <Helmet>
        <title>
          {props.pageTitle} - {data.site.siteMetadata.name || ""}
        </title>
        <meta name="description" content={props.pageDescription || ""} />

        <meta
          property="og:title"
          content={props.pageTitle + "-" + data.site.siteMetadata.name || ""}
        />
        <meta property="og:description" content={props.pageDescription || ""} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={data.site.siteMetadata.siteUrl + profile_photo}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />

        <meta
          property="twitter:title"
          content={props.pageTitle + "-" + data.site.siteMetadata.name || ""}
        />
        <meta
          property="twitter:description"
          content={props.pageDescription || ""}
        />
        <meta
          property="twitter:creator"
          content={data.site.siteMetadata.name}
        />
        <meta
          property="twitter:image"
          content={data.site.siteMetadata.siteUrl + profile_photo}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div
        id="site-wrapper"
        className={"theme-" + theme.toLowerCase() + " font-" + font}
      >
        <Menu
          currentPage={props.pageTitle}
          name={data.site.siteMetadata.name}
        />

        <div className="container" id="page-content">
          <div className="row">
            <div className="column" id="profile-wrapper">
              <div id="profile-panel-1" className="profile-panel ">
                <Profile
                  name={data.site.siteMetadata.name}
                  role={data.site.siteMetadata.role}
                  socialMedia={data.site.siteMetadata.socialMedia}
                  email={data.site.siteMetadata.email}
                />
              </div>
              <div className="languages-profile xs-hidden">
                <div id="profile-panel-2" className="profile-panel">
                  <h4>Languages</h4>
                  <Languages />
                </div>
              </div>
              <div className="skills-profile xs-hidden">
              <div id="profile-panel-3" className="profile-panel">
                <h4>Skills</h4>
                <Skills />
                </div>
              </div>
            </div>
            <div className="column" id="content-wrapper">
              <PageHeader title={props.pageTitle} showTitle={props.showTitle} />
              {props.children}
            </div>
          </div>
        </div>

        <footer>
          <div className="container">
            <div className="row">
              <div className="column">
                <Footer name={data.site.siteMetadata.name} />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
