import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {Component} from 'react'
import {TiStarFullOutline} from 'react-icons/ti'
import {RiMapPinFill} from 'react-icons/ri'
import {BsBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import Loader from 'react-loader-spinner'
import './index.css'
import Cookies from 'js-cookie'

const statusForJobs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const SkillSet = props => {
  const {details} = props
  const {image_url, name} = details
  return (
    <li>
      <img src={image_url} alt={name} />
      <p>{name}</p>
    </li>
  )
}

const SimilarJobSec = props => {
  const {details} = props
  const {company_logo_url, rating, job_description, title} = details
  return (
    <li className="similar_card">
      <div className="head_sec">
        <img
          src={company_logo_url}
          width="40px"
          className="com_logo"
          alt="company logo"
        />
        <div>
          <h3>{title}</h3>
          <div className="rating">
            <TiStarFullOutline className="rat" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="descrip">
        <h3 className="descr">Description</h3>
        <div className="popup-container">
          <Popup
            trigger={
              <button className="trigger-button" type="button">
                Trigger
              </button>
            }
          >
            <div>
              <p>React is a popular and widely used programming language</p>
            </div>
          </Popup>
        </div>
      </div>
      <p className="pp">{job_description}</p>
    </li>
  )
}

class JobsDetailedSec extends Component {
  state = {isLoader: true, detailArr: {}, status: statusForJobs.loading}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobs = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, optionsJobs)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({detailArr: data, status: statusForJobs.success})
    } else {
      this.setState({status: statusForJobs.failure})
    }
  }

  conditionCheckingForJobs = () => {
    const {status} = this.state
    switch (status) {
      case statusForJobs.loading:
        return this.getLoading()
      case statusForJobs.success:
        return this.renderJobDetails()
      case statusForJobs.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  getLoading = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader
          type="ThreeDots"
          color="#ffffff"
          height="50"
          width="50"
          className="load"
        />
      </div>
    )
  }

  renderJobDetails = () => {
    const {detailArr} = this.state
    const {
      company_logo_url,
      title,
      rating,
      location,
      employment_type,
      package_per_annum,
      job_description,
      skills,
      life_at_company,
    } = detailArr.job_details
    const {similar_jobs} = detailArr
    return (
      <div className="cardPart">
        <div className="cardDetailSec">
          <div className="head_sec">
            <img
              src={company_logo_url}
              className="com_logo"
              alt="company logo"
            />
            <div>
              <h4>{title}</h4>
              <div className="rating">
                <TiStarFullOutline className="rat" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="sec_sec">
            <div className="map_job">
              <RiMapPinFill className="ic" />
              <p>{location}</p>
              <BsBriefcaseFill className="ic" />
              <p>{employment_type}</p>
            </div>
            <h4>{package_per_annum}</h4>
          </div>
          <hr />
          <h3 className="descr">Description</h3>
          <p className="pp">{job_description}</p>
          <h3 className="descr">Skills</h3>
          <ul>
            {skills.map(each => (
              <SkillSet details={each} key={each.name} />
            ))}
          </ul>
          <h3 className="descr">Life at Company</h3>
          <div className="life_at">
            <p className="pp">{life_at_company.description}</p>
            <img src={life_at_company.image_url} alt="company" />
          </div>
        </div>
        <div className="bottom_s">
          <h3 className="descr">Similar Jobs</h3>
          <ul>
            {similar_jobs.map(each => (
              <SimilarJobSec details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    return <p>Failed to fetch job details. Please try again.</p>
  }

  render() {
    return (
      <div className="bgJobItemDetail">
        <Header />
        {this.conditionCheckingForJobs()}
      </div>
    )
  }
}

export default JobsDetailedSec
