/**
 * Builds the schema.org (JSON-LD) nodes injected in the page head.
 *
 * Everything is derived from the YAML files in content/ and from _data/site.js
 * so the structured data cannot drift away from what is rendered on the pages.
 */
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const site = require("./site.js");

const contentDir = path.resolve(__dirname, "../../content");

function loadYaml(file) {
  return yaml.load(fs.readFileSync(path.join(contentDir, file), "utf8"));
}

const education = loadYaml("education.yaml") || [];
const languages = loadYaml("languages.yaml") || [];
const skills = loadYaml("skills.yaml") || [];

const PERSON_ID = `${site.url}/#sebastian-proost`;
const WEBSITE_ID = `${site.url}/#website`;
const IMAGE_ID = `${site.url}/#profile-photo`;

const absolute = (url) => (/^https?:\/\//.test(url) ? url : `${site.url}${url}`);

const organization = (o) => ({
  "@type": o.type || "Organization",
  name: o.name,
  url: o.url,
});

/** Schools from education.yaml, de-duplicated and stripped of annotations. */
function alumniOf() {
  const seen = new Map();
  for (const e of education) {
    if (!e.school) continue;
    const name = String(e.school).replace(/\s*\(.*?\)\s*$/, "").trim();
    if (!seen.has(name)) seen.set(name, { "@type": "CollegeOrUniversity", name });
  }
  return [...seen.values()];
}

function hasCredential() {
  return education
    .filter((e) => e.degree)
    .map((e) => ({
      "@type": "EducationalOccupationalCredential",
      name: e.major ? `${e.degree} in ${e.major}` : e.degree,
      credentialCategory: e.degree,
      recognizedBy: e.school
        ? { "@type": "CollegeOrUniversity", name: String(e.school).replace(/\s*\(.*?\)\s*$/, "").trim() }
        : undefined,
    }));
}

/** Research topics plus technical skills, de-duplicated, order preserved. */
function knowsAbout() {
  const topics = [...site.researchKeywords, ...skills.map((s) => s.name)];
  const seen = new Set();
  return topics.filter((t) => {
    const key = String(t).toLowerCase();
    if (!t || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function knowsLanguage() {
  return languages
    .filter((l) => l.language)
    .map((l) => ({ "@type": "Language", name: l.language, alternateName: l.code }));
}

const image = {
  "@type": "ImageObject",
  "@id": IMAGE_ID,
  url: absolute(site.image),
  contentUrl: absolute(site.image),
  width: 400,
  height: 400,
  caption: site.name,
};

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  givenName: site.givenName,
  familyName: site.familyName,
  honorificSuffix: site.credential,
  description: site.description,
  url: `${site.url}/`,
  image: { "@id": IMAGE_ID },
  email: `mailto:${site.email}`,
  jobTitle: site.jobTitle,
  worksFor: site.employers.map(organization),
  affiliation: site.affiliations.map(organization),
  alumniOf: alumniOf(),
  hasCredential: hasCredential(),
  homeLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressCountry: site.address.countryCode,
    },
  },
  // Persistent scholarly identifier, alongside the plain sameAs link.
  identifier: site.orcid
    ? { "@type": "PropertyValue", propertyID: "ORCID", value: site.orcid.link }
    : undefined,
  knowsAbout: knowsAbout(),
  knowsLanguage: knowsLanguage(),
  sameAs: site.profileLinks.map((p) => p.link),
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${site.url}/`,
  name: site.name,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

module.exports = {
  personId: PERSON_ID,
  websiteId: WEBSITE_ID,
  imageId: IMAGE_ID,
  // Nodes shared by every page; templates prepend the node for the page itself.
  nodes: [person, website, image],
};
