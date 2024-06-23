import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import JobsecCard from '../JobsecCard'
import {FcBusinessman} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
    isLoading: true, // Set initial loading state to true
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    const {searchInput, selectedEmploymentTypes, selectedSalaryRange} =
      this.state
    const employmentTypes = selectedEmploymentTypes.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.setState({jobsList: data.jobs, isLoading: false}) // Set loading state to false
    } else {
      console.error('Failed to fetch jobs')
      this.setState({isLoading: false}) // Set loading state to false even on failure
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobsDetails)
  }

  onChangeEmploymentType = event => {
    const {selectedEmploymentTypes} = this.state
    const value = event.target.id
    if (event.target.checked) {
      this.setState(
        {selectedEmploymentTypes: [...selectedEmploymentTypes, value]},
        this.getJobsDetails,
      )
    } else {
      this.setState(
        {
          selectedEmploymentTypes: selectedEmploymentTypes.filter(
            type => type !== value,
          ),
        },
        this.getJobsDetails,
      )
    }
  }

  onChangeSalaryRange = event => {
    this.setState({selectedSalaryRange: event.target.id}, this.getJobsDetails)
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return jobsList.map(job => <JobsecCard details={job} key={job.id} />)
  }

  render() {
    const {searchInput, isLoading, jobsList} = this.state
    return (
      <div className="home_jobs">
        <Header />
        <div className="jobs_bottom">
          <div className="filter_sec">
            <div className="profile">
              <FcBusinessman className="pro" />
              <h2>Rahul</h2>
              <p>Lead software developer and AI-Ml expert</p>
            </div>
            <hr />
            <p className="job_category">Type of Employment</p>
            {employmentTypesList.map(each => (
              <div key={each.employmentTypeId} className="items">
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  onChange={this.onChangeEmploymentType}
                />
                <label htmlFor={each.employmentTypeId}>{each.label}</label>
              </div>
            ))}
            <hr />
            <p className="job_category">Salary Range</p>
            {salaryRangesList.map(each => (
              <div key={each.salaryRangeId} className="items">
                <input
                  type="radio"
                  name="salary"
                  id={each.salaryRangeId}
                  onChange={this.onChangeSalaryRange}
                />
                <label htmlFor={each.salaryRangeId}>{each.label}</label>
              </div>
            ))}
          </div>
          <div className="cards_sec">
            <div className="searchinsection">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <FaSearch className="search" />
            </div>
            {isLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                  className="load"
                />
              </div>
            ) : (
              <div className="cr">
                {jobsList.length > 0 ? (
                  this.renderJobsList()
                ) : (
                  <p>No jobs found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
