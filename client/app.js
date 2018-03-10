import history from './history';
import React from 'react'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'

import {  Home } from './components'


/**
 * COMPONENT
 */
export default function App () {
  return (
    <Router history={history}>
      <div>
        {/* <Navbar /> */}
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  )
}
