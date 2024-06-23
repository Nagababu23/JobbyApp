import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectRoute from './components/Protected'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobsDetailedSec from './components/JobsDetailedSec'

import './App.css'

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectRoute exact path="/" component={Home} />
      <ProtectRoute exact path="/jobs" component={Jobs} />
      <ProtectRoute exact path="/jobs/:id" component={JobsDetailedSec} />
    </Switch>
  )
}

export default App
