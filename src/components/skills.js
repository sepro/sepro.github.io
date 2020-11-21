import React from "react"
import Skill from "./skill"
import SkillData from "../../content/skills.yaml"


const Skills = props => {
    const skills = SkillData.sort(function (a, b) {
      return b.level - a.level;
    }).map((item, index) => (
    <Skill
      key={index}
      name={item.name}
      level={item.level}
      experience={item.experience}
    />
  ))
return (<div className="skills-overview">{skills}</div>)
}

export default Skills