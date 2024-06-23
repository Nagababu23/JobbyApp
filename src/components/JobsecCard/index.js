import {Component} from 'react'
import {Link} from 'react-router-dom'
import {TiStarFullOutline} from 'react-icons/ti'
import {RiMapPinFill} from 'react-icons/ri'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

class JobsecCard extends Component {
  render() {
    const {details} = this.props
    const {
      id,
      company_logo_url,
      employment_type,
      title,
      location,
      job_description,
      package_per_annum,
      rating,
    } = details

    return (
      <Link to={`/jobs/${id}`} className="LinkSec">
        <div className="cardSec">
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
          <h4 className="descr">Description</h4>
          <p className="pp">{job_description}</p>
        </div>
      </Link>
    )
  }
}
export default JobsecCard
