import {Component} from 'react'
import './index.css'
import ProjectHeader from '../ProjectHeader'
import ProjectItem from '../ProjectItem'
import Loader from 'react-loader-spinner'
const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class ProjectApp extends Component {
  state = {
    projectList: [],
    activeOptionId: categoriesList[0].id,
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getProject()
  }
  getProject = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeOptionId} = this.state
    const option = {
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${activeOptionId}`,
      option,
    )
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.projects.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        imageUrl: eachData.image_url,
      }))
      this.setState({
        projectList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getProject)
  }
  renderSuccessView = () => {
    const {projectList} = this.state
    return (
      <div className="con">
        <ul className="lists">
          {projectList.map(eachProject => (
            <ProjectItem key={eachProject.id} projectDetails={eachProject} />
          ))}
        </ul>
      </div>
    )
  }
  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="threeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )
  renderFailureView = () => (
    <div className="fail">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="text">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="button">Retry</button>
    </div>
  )
  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
  render() {
    const {activeOptionId, updateActiveOptionId} = this.state
    return (
      <div className="app">
        <ProjectHeader
          activeOptionId={activeOptionId}
          updateActiveOptionId={updateActiveOptionId}
          categoriesList={categoriesList}
        />
        {this.renderViews()}
      </div>
    )
  }
}
export default ProjectApp
