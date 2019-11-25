import React, { Component, Fragment } from 'react'
import axios from '../apis/server'
import Dota from '../Components/CardDota/Dota'
import './Home.css'

class Home extends Component {
  state = {
    data: [],
    say: 'hello worlds',
    page: null
  }

  componentDidMount () {
    this.setState({
      page: 'mainPage'
    })
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

  changePage (val) {
    this.setState({
      page: val
    })
  }

  render () {
    return (
      <Fragment>
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
      </Fragment>
    )
  }
}

export default Home