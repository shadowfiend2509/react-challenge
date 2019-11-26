import React, { Component, Fragment } from 'react'
import { MDBCardImage } from "mdbreact";
import axios from '../../../apis/server';
import Modal from '../Modal/Modal'

import './OneCard.css'

class OneCard extends Component {
  state = {
    player: {},
    hero: {},
    modal: false
  }

  componentDidMount () {
    this.fetchHeroId()
  }

  fetchHeroId = () => {
    axios({
      method: 'get',
      url: `/hero/${this.props.hero}`
    })
    .then(({data}) => {
      this.setState({
        hero: data.hero
      })
    })
    .catch(console.log)
  }

  toggle = nr => () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  render () {
    let check = null
    if(this.state.hero.vertical) {
      check = <Fragment>
                <div
                  onClick={this.toggle(this.state.hero.id)}
                  >
                  <MDBCardImage
                    className="img-fluid imageCard"
                    src={this.state.hero.vertical}
                    waves
                  />
                </div>
                <Modal 
                  key={this.state.hero.id}
                  modal={this.state.modal}
                  getToggle={this.toggle(this.state.hero.id)}
                  hero={this.state.hero}
                  playerId={this.props.player}
                  avgMmr={this.props.avgMmr}
                />
              </Fragment>
    } else {
      check = <Fragment>
        <div className="imageCard">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRI-idoNr0Fwg0QR5zSsWSKZUXy6YH-UgilqamaVncQFD7NwTM" alt="hero_image"/>
        </div>
      </Fragment>
    }
    return check
  }
}

export default OneCard