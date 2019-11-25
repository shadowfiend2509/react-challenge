import React, {Component, Fragment} from 'react'
import OneCard from './OneCard/OneCard'
import DetailGame from './Detail/Game'
import './Dota.css'

class Dota extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    let cardLeft = this.props.players.splice(0, 5)
    console.log(cardLeft)
      
    
    return (
      <Fragment>
          <div className="card">
            <div className="topHeader">
              <DetailGame 
                spectators={this.props.spectators} 
                radiantScore={this.props.radiantScore}
                direScore={this.props.direScore}
                avgMmr={this.props.avgMmr}
              />
            </div>
            <div className="matches">
              <div className="leftSide">
                {
                  cardLeft.map((pem, i) => {
                    return <OneCard
                      key={i}
                      player={pem.account_id}
                      hero={pem.hero_id}
                    />
                  })
                }
              </div>
              <div className="imageVS">
                <img src="https://storage.cloud.google.com/defaultimage/vs.png?authuser=1&folder&organizationId" alt="versus"/>
              </div>
              <div className="rightSide">
                {
                  this.props.players.map((pal, i) => {
                    return <OneCard 
                        key={i}
                        player={pal.account_id} 
                        hero={pal.hero_id}
                      />
                  })
                }
              </div>
            </div>
          </div>
      </Fragment>
    )
  }
}

export default Dota