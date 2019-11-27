import React, { useState } from 'react'
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from "mdbreact";
import { useHistory } from 'react-router-dom'
import ModalSignin from './ModalSignin'
import { SignOut } from '../../store/Action'
import ModalSignUp from './ModalSignUp'
import { useSelector, useDispatch } from 'react-redux'

import './NavBar.css'

export default () => {
  const [ modal, setModal ] = useState(false)
  const [ heroSearch, setHeroSearch ] = useState('')
  const [ typing, setTyping ] = useState(false)
  let history = useHistory()
  var isSignin = useSelector (state => state.storeSignin.isSignin)
  const dispatch = useDispatch()

  const toggle = () => {
    setModal(!modal)
  }
  const searchHeroes = ({target}) => {
    setHeroSearch(target.value)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
    }, 1000);
  }
  const findName = () => {
    history.push(`/search/${heroSearch}`)
    setModal(false)
  }
  const backHome = () => {
    history.push('/')
  }
  const signOut = () => {
    localStorage.removeItem("token")
    history.push('/')
    dispatch(SignOut())
  }
  // const num = () => (
  //   favStore.fav.HeroId.length
  // )
  return (
    <>
      <div className="NavBar">
        <div className="ml-3 logName">
          <div className="logoName" onClick={backHome}>
            DC DOTO
          </div>
          <div className="showHeroes" onClick={() => history.push('/heroes')}>
            All Heroes
          </div>
          <div className="showHeroes" onClick={() => history.push('/roles')}>
            All Roles
          </div>
          <div className="showProMatches" onClick={() => history.push('/team/random')}>
            Teams
          </div>
        </div>
        <div className="rightNav">
          {
            (isSignin)
              ?
              <div className="cartBadge" onClick={() => history.push('/fav')}>
                My Fav
              </div>
              :
              null
          }
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
          {
            (isSignin) ? <MDBBtn rounded outline color='secondary' onClick={signOut}>SignOut</MDBBtn> : <><ModalSignin /> &nbsp; &nbsp; <ModalSignUp/></>
          }
        </div>
      </div>
    </>
  )
}
