import React, { useState, Fragment } from 'react'
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { useHistory } from 'react-router-dom'
import ModalSignin from './ModalSignin'
import './NavBar.css'

export default () => {
  const [ modal, setModal ] = useState(false)
  const [ heroSearch, setHeroSearch ] = useState('')
  const [ typing, setTyping ] = useState(false)
  let history = useHistory()

  function toggle () {
    setModal(!modal)
  }
  function searchHeroes ({target}) {
    setHeroSearch(target.value)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
    }, 1000);
  }
  function findName () {
    history.push(`/search/${heroSearch}`)
    setModal(false)
  }
  function backHome () {
    history.push('/')
  }
  return (
  <Fragment>
    <div className="NavBar">
      <div className="ml-3 logName">
        <div className="logoName" onClick={backHome}>
          DC DOTA
        </div>
        <div className="showHeroes" onClick={() => history.push('/heroes')}>
          All Heroes
        </div>
        <div className="showHeroes" onClick={() => history.push('/roles')}>
          All Roles
        </div>
        <div className="showProMatches">
          Pro Matches
        </div>
      </div>
      <div className="rightNav">
        <MDBBtn onClick={toggle}>Search Heroes</MDBBtn>

        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>Search Heroes</MDBModalHeader>
          <MDBModalBody>
            <MDBInput onChange={searchHeroes} name='search' label="Search Heroes" />
            {
              (typing) ? <small>typing...</small> : null
            }
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
            <MDBBtn color="primary" onClick={findName}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
        <ModalSignin />
        <MDBBtn rounded outline color='secondary'>SignOut</MDBBtn>
      </div>
    </div>
  </Fragment>
  )
}
