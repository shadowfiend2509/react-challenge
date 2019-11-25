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
    // if(this.state.hero) {
      if(this.state.hero.vertical) {
        check = <Fragment>
                  {/* <div className='imageCard'> */}
                  <div
                    onClick={this.toggle(this.state.hero.id)}
                    >
                    <MDBCardImage
                      className="img-fluid imageCard"
                      src={this.state.hero.vertical}
                      waves
                    />
                  </div>
                    {/* <img src={this.state.hero.vertical} alt='hero_image' /> */}
                  {/* </div> */}
                  <Modal 
                    modal={this.state.modal}
                    getToggle={this.toggle(this.state.hero.id)}
                    hero={this.state.hero}
                    playerId={this.props.player}
                  />
                </Fragment>
      } else {
        check = <Fragment>
          <div className="imageCard">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRI-idoNr0Fwg0QR5zSsWSKZUXy6YH-UgilqamaVncQFD7NwTM" alt="hero_image"/>
          </div>
        </Fragment>
      }
    // } else {
    //   check = <div>EMPTY</div>
    // }
    return check
  }
}

export default OneCard