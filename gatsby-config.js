module.exports = {
  /* Your site config here */
  // In case the website is hosted in a subdir, include that path here
  pathPrefix: "",
  siteMetadata: {
    siteUrl: `https://sebastian.proost.science`,
    name: `Sebastian Proost, PhD`,
    role: `Bioinformatics | Data Science`,
    email: `sebastian.proost@gmail.com`,
    socialMedia: [
      {
        name: "github",
        link: "https://github.com/sepro",
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/sebastian-proost-581a6a88/",
      },
      { name: "twitter", link: "https://twitter.com/ProostSebastian" },
    ],
    // Name to highlight in publications
    publication_highlight: `S. Proost`,
    about: `
      <h3>Bio</h3>
      <p>Currently working as a Senior PostDoc at the <a href="https://cfm.vib.be/">VIB-KULeuven Center for Microbiology</a> (Leuven, Belgium) studying the human 
      gut microbiome and how it connects with the host's health.</p>

      <p>After getting a Masters degree in Biotechnology (UGent, Belgium) obtaining a PhD in Bioinformatics 
      (<a href="https://vib.be/vib-ugent-center-plant-systems-biology">VIB-UGent Center for Plant Systems Biology</a>) made it possible to unify an 
      interest in life sciences with computer engineering. Over the course of several PostDocs (<em>e.g.</em> at the <a href="https://www.mpimp-golm.mpg.de/2168/en">Max 
      Planck Institute of Molecular Plant Physiology</a>) I have ventured more and more towards software development, setting up web platforms to explore large datasets while
      leveraging data science and machine learning methods to pick them apart further.</p>
      
      <p>Full bio available under <a href="./experience">experience & education</a>.</p>

      <h3>Research</h3>
      <p>The common theme throughout my research is leveraging large datasets to tackle biological questions. This goes hand in hand with using modern
      (web) technology to create intuitive tools which allows domain experts to explore these data. Over the years I've been involved in the development 
      of various platforms to study genome evolution, gene function, and microbial ecosystems. These have been used in a number of projects <em>e.g.</em> the 
      Apple genome project, the Flemish Gut Flora Project, ... A full list of tools is avialable under <a href="./software">software</a>.</p>

      <p>More details what I've been working on recently? Check out the <a href="./media">media</a> and <a href="./publications">publications</a> pages!</p>

      <p>Less serious topics I work on, outside of work (for fun or to hone my programmings skills), can be found on my blog <a href="https://blog.4dcu.be/">4DCu.be</a>.</p>
      `,
    //available_themes: ["great-gatsby", "master-yoda", "wonder-woman", "darth-vader", "luke-lightsaber", "sebastian-proost"],
    theme: "sebastian-proost",
    //fonts. Available: [default, programmer]
    font: "default",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-less`,
    `gatsby-plugin-catch-links`,  // This pluging will replace links in the about section with gatsby links
    {
      resolve: `gatsby-plugin-build-date`,
      options: {
        formatAsDateString: true, // boolean, defaults to true - if false API will return unformatted string from new Date()
        formatting: {
          format: "DD/MM/YYYY", // string, defaults to "MM/DD/YYYY" - pass in any acceptable date-and-time format
          utc: false, // boolean, defaults to false - output time as UTC or not, following date-and-time API
        },
      },
    },
    {
      resolve: `gatsby-plugin-scroll-reveal`,
      options: {
        threshold: 0.5, // Percentage of an element's area that needs to be visible to launch animation
        once: true, // Defines if animation needs to be launched once
        disable: false, // Flag for disabling animations

        // Advanced Options
        selector: "[data-sal]", // Selector of the elements to be animated
        animateClassName: "sal-animate", // Class name which triggers animation
        disabledClassName: "sal-disabled", // Class name which defines the disabled state
        rootMargin: "0% 50%", // Corresponds to root's bounding box margin
        enterEventName: "sal:in", // Enter event name
        exitEventName: "sal:out", // Exit event name
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              //family: "Roboto",
              family: `IBM Plex Mono`,
              variants: ["300", "400", "500"],
              //subsets: ['latin']
              //text: 'Hello'
              //fontDisplay: 'swap',
              //strategy: 'selfHosted' // 'base64' || 'cdn'
              // formatAgents: {
              //   eot: `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)`,
              //   ttf: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.8`,
              //   woff: `Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko`,
              //   woff2: `Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393`,
              // },
            },
          ],
        },
        //formats: ['woff2', 'woff'],
        //useMinify: true,
        //usePreload: true,
        //usePreconnect: false,
      },
    },
  ],
}
