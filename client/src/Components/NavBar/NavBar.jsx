import React, { Component, Fragment } from 'react'
import './NavBar.css'

class NavBar extends Component {
  render () {
    return (
      <Fragment>
        <div className="NavBar">
          <div className="logoName">
            DOTA LIVE by DreamCar Official
          </div>
          <div className="rightNav">
            <div className="btnLogin">
              Login
            </div>
            <div className="btnLogout">
              Logout
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default NavBar