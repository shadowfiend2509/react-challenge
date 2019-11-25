import React, { Component, Fragment } from 'react'

class Game extends Component {
  render () {
    return (
      <Fragment>
        <div className='topLeft'>
          <h3>Spectators {this.props.spectators}</h3>
        </div>
        <div className="middle">
          <h3>Radiant Score: {this.props.radiantScore}</h3>
        </div>
        <div className="middle">
          <h3>Dire Score: {this.props.direScore}</h3>
        </div>
        <div className='topRight'>
          <h3>AVG_MMR {this.props.avgMmr}</h3>
        </div>
      </Fragment>
    )
  }
}

export default Game