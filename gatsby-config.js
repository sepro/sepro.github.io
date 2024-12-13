module.exports = {
  /* Your site config here */
  // In case the website is hosted in a subdir, include that path here
  pathPrefix: "",
  siteMetadata: {
    siteUrl: `https://sebastian.proost.science`,
    name: `Sebastian Proost, PhD`,
    role: `Bioinformatics | Data Science`,
    email: `sebastian.proost@gmail.com`,
    buildTime: new Date().toISOString(), // Add build time
    socialMedia: [
      {
        name: "github",
        link: "https://github.com/sepro",
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/sebastian-proost-581a6a88/",
      },
      { name: "x", link: "https://x.com/ProostSebastian" },
      { name: "bsky", link: "https://bsky.app/profile/sebastian.proost.science" },
      { name: "instagram", link: "https://www.instagram.com/sebastian.proost/" },
    ],
    // Name to highlight in publications
    publication_highlight: `S. Proost`,
    about: `
      <p>Currently a <strong>Senior Postdoctoral Researcher</strong> at the <a href="https://cfm.vib.be/">VIB-KULeuven Center for Microbiology</a> (Leuven, Belgium), focussing on the <strong>human 
      gut microbiome</strong> and its connections to host <strong>health</strong>.</p>

      <p>After earning a <strong>Masters degree in Biotechnology</strong> (UGent, Belgium), I pursued a <strong>PhD in Bioinformatics</strong> 
      (<a href="https://vib.be/vib-ugent-center-plant-systems-biology">VIB-UGent Center for Plant Systems Biology</a>) combining my passion 
      for life sciences with expertise in computer engineering.</p>

      <p>Throughout my <strong>postdoctoral career</strong>, including time at the <a href="https://www.mpimp-golm.mpg.de/2168/en">Max 
      Planck Institute of Molecular Plant Physiology</a>, I have increasingly specialized in <strong>software development</strong> and <strong>statistical analysis</strong>. This includes building <strong>web 
      platforms</strong> for exploring large datasets and applying <strong>data science</strong> and <strong>machine learning</strong> techniques to deepen insights.</p>
      
      <p><em>Full bio available under <a href="./experience">experience & education</a>.</em></p>
      `,
    research:`
      <p>The common theme throughout my research is leveraging large datasets to tackle biological questions. This goes hand in hand with using modern
      (web) technology to create intuitive tools which allows domain experts to explore these data. Over the years I've been involved in the development 
      of various platforms to study genome evolution, gene function, and microbial ecosystems. These have been used in a number of projects <em>e.g.</em> the 
      Apple genome project, the Flemish Gut Flora Project, ... A full list of tools is avialable under <a href="./software">software</a>.</p>

      <p>More details what I've been working on recently? Check out the <a href="./media">media</a> and <a href="./publications">publications</a> pages!</p>

      <p>Less serious topics I work on, outside of work (for fun or to hone my programmings skills), can be found on my blog <a href="https://blog.4dcu.be/">4DCu.be</a>.</p>
      `,
    theme: "sebastian-proost",
    //fonts. Available: [default, programmer]
    font: "default",
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-less`,
    `gatsby-plugin-catch-links`, // This pluging will replace links in the about section with gatsby links
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
