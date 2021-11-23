import React from "react"
import LanguageData from "../../content/languages.yaml"
import Flag from "react-flags";

const Languages = props => {
    const languages = LanguageData.map((item, index) => (
    <span key={"language" + index} className="language-flag">
           <Flag name={item.short}           
           format="png"
           pngSize={24}
           width="24"
           height="24"
           shiny={false}
           alt={item.language} 
           basePath="/img/flags"/>
    </span>
  ))
return (<div className="languages-wrapper">{languages}</div>)
}

export default Languages