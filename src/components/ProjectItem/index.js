import './index.css'
const ProjectItem=props=>{
  const {projectDetails}=props
  const {name,imageUrl}=projectDetails
  return (
    <li className="list">
    <div className="div">
    <img src={imageUrl} alt={name} className="image"/>
    <h1 className="name">{name}</h1>
    </div>
    </li>
  )
}
export default ProjectItem
