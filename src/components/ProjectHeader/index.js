import './index.css'
const ProjectHeader = props => {
  const {activeOptionId, updateActiveOptionId, categoriesList} = props
  const onChangeSelect = event => {
    updateActiveOptionId(event.target.value)
  }
  return (
    <div className="head">
      <nav className="nav">
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
          alt="website logo"
          className="logo"
        />
        <h1 className="heading">
          Projects
          <br />
          Showcase
        </h1>
        <select value={activeOptionId} onChange={onChangeSelect}>
          {categoriesList.map(eachCategory => (
            <option key={eachCategory.id} value={eachCategory.id}>
              {eachCategory.displayText}
            </option>
          ))}
        </select>
      </nav>
    </div>
  )
}
export default ProjectHeader
