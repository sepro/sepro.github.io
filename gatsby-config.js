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
    about: `
      <p>The son of Jedi Knight Anakin Skywalker and Senator Padmé Amidala,
      Luke Skywalker was born along with his twin sister Leia in 19 BBY.
      As a result of Amidala's death and Anakin's fall to the dark side of the Force,
      the Skywalker children were separated and sent into hiding,
      with Leia adopted by the royal family of Alderaan while Luke was raised by his relatives on Tatooine.
      Longing for a life of adventure and purpose,
      Skywalker joined the Rebellion and began learning the ways of the Force under the guidance of Jedi Master Obi-Wan Kenobi,
      whose first apprentice was Luke's own father.
      During the Battle of Yavin in 0 BBY, Skywalker saved the Alliance from annihilation by destroying the Empire's planet-killing superweapon,
      the Death Star. He continued his training in the years that followed,
      determined to become a Jedi Knight like his father before him,
      and found a new mentor in Grand Master Yoda. After his master's death,
      Skywalker participated in the Battle of Endor in 4 ABY,
      during which he confronted the Sith Lord Darth Vader,
      whom he learned was in fact his father, Anakin Skywalker.
      With Luke's help, Anakin returned to the light side of the Force by destroying the Emperor at the cost of his own life,
      fulfilling his destiny as the Chosen One. You can find more information <a href="https://starwars.fandom.com/wiki/Luke_Skywalker" target="_blank" rel="noopener noreferrer">here</a>.</p>
      <p>See the PDF version of my resume <a href="#">here</a>.</p>
      <p>As you can see, it's possible to add HTML tags in your about page.</p>
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
