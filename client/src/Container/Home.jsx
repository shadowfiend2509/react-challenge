import React, { Component, Fragment } from 'react'
import Nav from '../Components/NavBar/NavBar'
import axios from '../apis/server'
import Dota from '../Components/CardDota/Dota'
import './Home.css'

class Home extends Component {
  state = {
    data: [],
    say: 'hello worlds',
    page: 'mainPage'
  }

  componentDidMount () {
    this.fetchData()
  }

  fetchData = () => {
    axios({
      method: 'get',
      url: '/dota/live'
    })
      .then((res) => {
        this.setState({
          data: res.data.liveGame
        })
      })
      .catch(console.log)
  }

  render () {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
            <Nav />
          </header>
          <div className='backCard'>
            {
              this.state.data.map((dota, i) => {
                return <Dota
                  key={i} 
                  spectators={dota.spectators} 
                  avgMmr={dota.avg_mmr}
                  players={dota.players}
                  radiantScore={dota.radiantScore}
                  direScore={dota.direScore}
                />
              })
            }
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Home