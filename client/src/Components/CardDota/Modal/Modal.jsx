import React, {useState, useEffect, Fragment} from 'react'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBCard } from 'mdbreact';
import { MDBRow, MDBCol } from "mdbreact";
import { Avatar, Icon } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import axios from '../../../apis/server';
import './Modal.css'

export default (props) => {
  const [ heroDetail, setHeroDetail ] = useState({});
  const [ player, setPlayer ] = useState({})

  useEffect(_ => {
    fetchDetailHero()
    fetchAccId()
  }, [])

  function fetchAccId () {
    axios({
      method: 'get',
      url: `/dota/acc/${props.playerId}`
    })
      .then(({data}) => {
        setPlayer(data.profile)
      })
      .catch(console.log)
  }
  function fetchDetailHero () {
    axios({
      method: 'get',
      url: `/dota/${props.hero.id}`
    })
      .then(({data}) => {
        setHeroDetail(data.hero)
      })
      .catch(console.log)
  }
  return (
    <MDBModal isOpen={props.modal} toggle={() => props.getToggle(props)} fullHeight position="top">
      <MDBModalHeader toggle={() => props.getToggle}>{props.hero.name}</MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <MDBCol md="6" sm="12" className='modalRow'>
              <MDBCard color="primary-color" text="white" className="text-center p-3">
                <blockquote className="blockquote mb-0">
                  <div className='avatar'>
                    {
                      (player.avatarfull) ? <Avatar size={190} src={player.avatarfull} /> : <Avatar size={190} icon={<Icon type="user" />} />
                    }
                  </div>
                  <p>
                    Steam ID : {player.steamid}<br></br>
                    <a href={player.profileurl} className='textCard'>Profile</a><br></br>
                    {
                      (player.last_login) ? <Fragment>Last Login : {player.last_login.split('T')[0]}</Fragment> : null
                    }
                  </p>
                  <footer className="blockquote-footer">
                    <small className="text-white">
                      Nick Name : {" "}
                      <cite title="Source Title">
                        {
                          (player.personaname) ? player.personaname : player.name
                        }
                      </cite>
                    </small>
                  </footer>
                </blockquote>
              </MDBCard>
              {JSON.stringify(player)}
            </MDBCol>
            <MDBCol md="6" sm="12" className='modalRow rowRight'>
              {JSON.stringify(heroDetail)}
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={() => props.getToggle(props.hero.id)}>Close</MDBBtn>
        <MDBBtn color="primary">Save changes</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  )
}