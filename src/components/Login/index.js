import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', message: ''}

  changeToHome = jwt_token => {
    const {history} = this.props
    Cookies.set('jwt_token', jwt_token, {expires: 30})
    history.replace('/')
  }

  addUser = event => {
    this.setState({username: event.target.value})
  }

  addPass = event => {
    this.setState({password: event.target.value})
  }

  checkC = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const Url = 'https://apis.ccbp.in/login'
    const sendingDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(sendingDetails),
    }
    const fetching = await fetch(Url, options)
    const waitingForData = await fetching.json()
    this.setState({
      username: '',
      password: '',
    })
    if (fetching.ok) {
      this.changeToHome(waitingForData.jwt_token)
    } else {
      this.setState({message: waitingForData.error_msg})
    }
  }

  render() {
    const {username, password, message} = this.state
    const jwt_token = Cookies.get('jwt_token')
    if (jwt_token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="card">
          <div className="imgsec">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              width="100px"
            />
          </div>
          <br />
          <form onSubmit={this.checkC}>
            <label>USERNAME</label>
            <br />
            <input
              type="text"
              placeholder="Username"
              onChange={this.addUser}
              value={username}
            />
            <br />
            <label>PASSWORD</label>
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={this.addPass}
              value={password}
            />
            <br />
            <input type="submit" value="Login" />
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
