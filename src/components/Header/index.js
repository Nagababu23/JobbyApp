import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  logingOut = () => {
    const {history} = this.props
    const jwt_token = Cookies.get('jwt_token')
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  homes = () => {
    const {history} = this.props
    history.replace('/')
  }
  jobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }
  render() {
    return (
      <div className="navbar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          width="90px"
        />
        <ul>
          <li>
            <button onClick={this.homes}>Home</button>
          </li>
          <li>
            <button onClick={this.jobs}>Jobs</button>
          </li>
        </ul>
        <button className="logout" onClick={this.logingOut}>
          Lougout
        </button>
      </div>
    )
  }
}
export default withRouter(Header)
