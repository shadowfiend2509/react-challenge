import React, { Component, Fragment } from 'react'
import axios from '../../../apis/server'
import './OneCard.css'

class OneCard extends Component {
  state = {
    player: {},
    hero: {}
  }

  componentDidMount () {
    this.fetchAccId()
    this.fetchHeroId()
  }

  fetchAccId = () => {
    axios({
      method: 'get',
      url: `/dota/acc/${this.props.player}`
    })
      .then(({data}) => {
        this.setState({
          player: data
        })
      })
      .catch(console.log)
  }

  fetchHeroId = () => {
    axios({
      method: 'get',
      url: `/hero/${this.props.hero}`
    })
    .then(({data}) => {
      console.log(data)
      this.setState({
        hero: data.hero
      })
    })
    .catch(console.log)
  }

  render () {
    let check = null
    if(this.state.hero) {
      if(this.state.hero.vertical) {
        check = <Fragment>
                  <div className='imageCard'>
                    <img src={this.state.hero.vertical} alt='hero_image' />
                  </div>
                </Fragment>
      } else {
        check = <Fragment>
          <div className="imageCard">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRI-idoNr0Fwg0QR5zSsWSKZUXy6YH-UgilqamaVncQFD7NwTM" alt="hero_image"/>
          </div>
        </Fragment>
      }
    } else {
      check = <div>EMPTY</div>
    }
    return check
  }
}

export default OneCard