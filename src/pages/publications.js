import React, { useState } from "react"
import Layout from "../components/layout"
import PublicationData from "../../content/publications.yaml"
import PatentData from "../../content/patents.yaml"
import Citations from "../components/citations"
import Publication from "../components/publication"

const Publications = () => {
  const [selectedYear, setSelectedYear] = useState("All")

  const handleYearChange = event => {
    setSelectedYear(event.target.value)
  }

  const filteredPublications = PublicationData.filter(item => {
    return selectedYear === "All" ? true : item.Year.toString() === selectedYear;
  });

  const filteredPatents = PatentData.filter(item => {
    return selectedYear === "All" ? true : item.Year.toString() === selectedYear;
  });

  const years = [
    ...new Set([
      ...PublicationData.map(item => item.Year),
      ...PatentData.map(item => item.Year)
    ])
  ].sort((a, b) => b - a)

  const publications = filteredPublications.map((item, index) => (
    <Publication
      key={index}
      title={item.Title}
      authors={item.Authors}
      journal={item.Journal}
      year={item.Year}
      preprint={item.Preprint}
      badges={item.URLs || []}
    />
  ))

  const patents = filteredPatents.map((item, index) => (
    <Publication
      key={index}
      title={item.Title}
      authors={item.Inventors}
      journal={"Patent: " + item.Identifier}
      year={item.Year}
      preprint={0}
      badges={item.URLs || []}
    />
  ))

  return (
    <Layout
      pageTitle="Publications and Patents"
      pageDescription="an overview of my scientific publications and patents"
      showTitle={true}
    >
      <Citations />
      <div className="citations">
        * These authors contributed equally to this work
      </div>
      <div>
        <label htmlFor="year-filter">Filter by year: </label>
        <select id="year-filter" value={selectedYear} onChange={handleYearChange}>
          <option value="All">All</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        {patents}
        {publications}
      </div>
    </Layout>
  )
}

export default Publications