import React, {useState, useEffect, Fragment} from 'react'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBCard } from 'mdbreact';
import { MDBRow, MDBCol } from "mdbreact";
import { Avatar, Icon, Card, Badge, Tag } from 'antd';
import { useHistory } from 'react-router-dom'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import axios from '../../../apis/server';
import './Modal.css'

export default (props) => {
  const [ heroDetail, setHeroDetail ] = useState({});
  const [ player, setPlayer ] = useState({})
  const history = useHistory()
  
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
      <MDBModalHeader toggle={() => props.getToggle}>AVG MMR {props.avgMmr}</MDBModalHeader>
        <MDBModalBody>
          <MDBRow>
            <MDBCol md="6" sm="12" className='modalRow'>
              <MDBCard color="secondary-color" text="white" className="text-center p-3">
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
                    <small className="text-dark">
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
            </MDBCol>
            <MDBCol md="6" sm="12" className='modalRow rowRight'>
              <Card title={heroDetail.localized_name} bordered={false} style={{ width: '100%' }}>
                <div className="cardModal">
                  <div className="imageModal">
                    <p><Avatar size={90} src={props.hero.small} /></p>
                  </div>
                  <div className="descModal ml-5">
                    <p> Role : &nbsp; &nbsp;
                      {
                        (heroDetail.roles) ? heroDetail.roles.map( role => <Tag color="magenta">{role}</Tag> ) : <Badge count={0} style={{ backgroundColor: 'blue' }} />
                      }
                    </p>
                    <p>
                      Base Health : {heroDetail.base_health}<br />
                      Base Mana : {heroDetail.base_mana}<br />
                      Base Str : {heroDetail.base_str}<br />
                      Base Agi : {heroDetail.base_agi}<br />
                      Base Int : {heroDetail.base_int}<br />
                      Attack Range : {heroDetail.attack_range}<br />
                      Move Speed : {heroDetail.move_speed}
                    </p>
                  </div>
                </div>
              </Card>
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={() => props.getToggle(props.hero.id)}>Close</MDBBtn>
        <MDBBtn color="primary" onClick={() => history.push(`/detail/${heroDetail.id}`)}>See Detail Hero</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  )
}