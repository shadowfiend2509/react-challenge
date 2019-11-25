import React, { Fragment} from 'react'
import OneCard from './OneCard/OneCard'
import DetailGame from './Detail/Game'
import './Dota.css'

export default (props) => {

  let cardLeft = props.players.splice(0, 5)
  return (
    <Fragment>
        <div className="card1">
          <div className="textLive">
            Live Game
          </div>
          <div className="topHeader">
            <DetailGame 
              spectators={props.spectators} 
              radiantScore={props.radiantScore}
              direScore={props.direScore}
              avgMmr={props.avgMmr}
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
                props.players.map((pal, i) => {
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