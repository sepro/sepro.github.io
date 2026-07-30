const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const contentDir = path.resolve(__dirname, "../../content");

function loadYaml(file) {
  const p = path.join(contentDir, file);
  return yaml.load(fs.readFileSync(p, "utf8"));
}

const publications = loadYaml("publications.yaml") || [];
const patents = loadYaml("patents.yaml") || [];
const citations = loadYaml("citations.yaml") || {};
const profile = loadYaml("profile.yaml") || {};

function fmt(n) {
  if (n == null) return "";
  return Number(n).toLocaleString("en-US");
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "27/05/2026" (dd/mm/yyyy) -> "May 2026"; anything else is passed through. */
function monthYear(date) {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(date || "").trim());
  if (!m) return String(date || "");
  return `${MONTHS[Number(m[2]) - 1]} ${m[3]}`;
}

const title = "Project Manager";
const subtitle = "Bioinformatics, AI & Data Science";
const org = "VIB-KU Leuven Center for Microbiology";
const location = "Leuven, Belgium";

const socialMedia = [
  { name: "GitHub", icon: "github", link: "https://github.com/sepro" },
  { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/sebastian-proost-581a6a88/" },
  { name: "X", icon: "x", link: "https://x.com/ProostSebastian" },
  { name: "Bluesky", icon: "bsky", link: "https://bsky.app/profile/sebastian.proost.science" },
  { name: "Instagram", icon: "instagram", link: "https://www.instagram.com/sebastian.proost/" },
];

const academicProfiles = profile.academicProfiles || [];

const byIcon = (icon) => academicProfiles.find((p) => p.icon === icon) || null;
const orcidProfile = byIcon("orcid");
const scholarProfile = byIcon("scholar");

module.exports = {
  url: "https://sebastian.proost.science",
  name: "Sebastian Proost",
  givenName: profile.givenName,
  familyName: profile.familyName,
  credential: "PhD",
  title,
  subtitle,
  jobTitle: `${title}, ${subtitle}`,
  org,
  location,
  address: profile.address || {},
  image: profile.image,
  email: "sebastian.proost@gmail.com",
  publicationHighlight: "S. Proost",
  description: `${title} — ${subtitle}. ${org}, ${location}.`,

  employers: profile.employers || [],
  affiliations: profile.affiliations || [],

  socialMedia,
  academicProfiles,
  // Persistent scholarly identifier, shown as text (not only as an icon).
  orcid: orcidProfile
    ? { id: orcidProfile.link.replace(/^https?:\/\/orcid\.org\//, ""), link: orcidProfile.link }
    : null,
  scholarLink: scholarProfile ? scholarProfile.link : null,
  // Every profile link, in the order they are rendered in the hero.
  profileLinks: [...academicProfiles, ...socialMedia],

  aboutHtml: `
    <p>Currently <strong>Project Manager (Bioinformatics, AI &amp; Data Science)</strong> at the <a href="https://cfm.vib.be/">VIB-KU Leuven Center for Microbiology</a> (Leuven, Belgium), focussing on the <strong>human gut microbiome</strong> and its connections to host <strong>health</strong>.</p>
    <p>After earning a <strong>Masters degree in Biotechnology</strong> (UGent, Belgium), I pursued a <strong>PhD in Bioinformatics</strong> (<a href="https://vib.be/vib-ugent-center-plant-systems-biology">VIB-UGent Center for Plant Systems Biology</a>) combining my passion for life sciences with expertise in computer engineering.</p>
    <p>Throughout my <strong>postdoctoral career</strong>, including time at the <a href="https://www.mpimp-golm.mpg.de/2168/en">Max Planck Institute of Molecular Plant Physiology</a>, I have increasingly specialized in <strong>software development</strong> and <strong>statistical analysis</strong>. This includes building <strong>web platforms</strong> for exploring large datasets and applying <strong>data science</strong> and <strong>machine learning</strong> techniques to deepen insights.</p>
    <p><em>Full bio available under <a href="/experience/">experience &amp; education</a>.</em></p>
  `,

  researchHtml: `
    <p>The common theme throughout my research is leveraging large datasets to tackle biological questions. This goes hand in hand with using modern (web) technology to create intuitive tools which allow domain experts to explore these data. Over the years I&apos;ve been involved in the development of various platforms to study genome evolution, gene function, and microbial ecosystems &mdash; applied in projects such as the Apple genome project and the Flemish Gut Flora Project. A full list of tools is available under <a href="/software/">software</a>.</p>
    <p>More details on what I&apos;ve been working on recently? Check out the <a href="/media/">media</a> and <a href="/publications/">publications</a> pages.</p>
    <p>Less serious topics &mdash; for fun or to hone my programming skills &mdash; can be found on my blog <a href="https://blog.4dcu.be/">4DCu.be</a>.</p>
  `,

  researchKeywords: [
    "Human Gut Microbiome",
    "Bioinformatics",
    "Data Science",
    "Machine Learning",
    "Web Platforms",
    "Comparative Genomics",
    "Genome Evolution",
    "Statistical Analysis",
  ],

  stats: {
    publications: publications.length,
    publicationsLabel: fmt(publications.length),
    patents: patents.length,
    patentsLabel: fmt(patents.length),
    citations: citations.count || 0,
    citationsLabel: fmt(citations.count || 0),
    hIndex: citations.hindex || 0,
    hIndexLabel: fmt(citations.hindex || 0),
    i10Index: citations.i10index || 0,
    i10IndexLabel: fmt(citations.i10index || 0),
    citationsDate: citations.date || "",
    // Month + year is the honest resolution for metrics that drift constantly.
    citationsDateLabel: monthYear(citations.date),
    citationsPlatform: citations.platform || "",
  },
};
