import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  findJob = () => {
    console.log('hii')
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div className="HomePage">
        <Header />
        <div className="main_part">
          <div className="inner_sec">
            <h1>
              Find The Job That
              <br /> Fits Your Life
            </h1>
            <p className="dec">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <button className="logouti" onClick={this.findJob}>Find Jobs</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
