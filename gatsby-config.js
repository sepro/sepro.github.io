module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteUrl: `https://sebastian.proost.science/`,
    name: `Sebastian Proost, PhD`,
    role: `Bioinformatics | Data Science`,
    email: `sebastian.proost@gmail.com`,
    socialMedia: [
      {
        name: "github",
        link: "https://github.com/sepro",
      },
      { name: "linkedin", link: "https://www.linkedin.com/in/sebastian-proost-581a6a88/" },
      { name: "twitter", link: "https://twitter.com/ProostSebastian" },
    ],
    // Name to highlight in publications
    publication_highlight: `S. Proost`,
    about: `
      <p></p>
      <p>See the PDF version of my resume <a href="#">here</a>.</p></p>
      `,
    skills: [
      {
        name: "JavaScript",
        level: "85",
        experience: "5 years",
      },
      {
        name: "Python",
        level: "75",
        experience: "2 years",
      },
      {
        name: "Java",
        level: "65",
        experience: "2 years",
      },
      {
        name: "React",
        level: "75",
        experience: "1 years",
      },
      {
        name: "Linux",
        level: "75",
        experience: "4 years",
      },
      {
        name: "C++",
        level: "40",
        experience: "1 years",
      },
    ],
    //available_themes: ["great-gatsby", "master-yoda", "wonder-woman", "darth-vader", "luke-lightsaber", "sebastian-proost"],
    theme: "sebastian-proost",
    //fonts. Available: [default, programmer]
    font: "default",
  },
  plugins: [
    // Make sure this plugin is first in the array of plugins
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-47068418-2",
        head: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-less`,
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true, // boolean, defaults to true - if false API will return unformatted string from new Date()
        formatting: {
          format: 'DD/MM/YYYY', // string, defaults to "MM/DD/YYYY" - pass in any acceptable date-and-time format
          utc: false, // boolean, defaults to false - output time as UTC or not, following date-and-time API
        }
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `IBM Plex Mono`,
          },
        ],
      },
    },
  ],
}
