import {Component} from 'react'
import './index.css'

class FilterSec extends Component {
  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    return (
      <div className="filter_sec">
        <div className="profile">
          <h2>Rahul</h2>
          <p>Lead software developer and AI-Ml expert</p>
          <p></p>
        </div>
        <hr />
        <p>Type of Employment</p>
        {employmentTypesList.map(each => (
          <div>
            <input type="checkbox" id={each.employmentTypeId} />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </div>
        ))}
      </div>
    )
  }
}
export default FilterSec
