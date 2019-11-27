import React, { useState } from 'react'
import { MDBInput } from 'mdbreact'
import { Route, Switch, useHistory } from 'react-router-dom'
import AllTeam from './AllTeam/AllTeam'
import SearchTeam from './SearchTeam/SearchTeam'
import { Button } from 'antd'
import './Team.css'

export default () => {
  const [ teamName, setTeamName ] = useState('')
  const history = useHistory()

  const searchTeam = (e) => {
    setTeamName('')
    e.preventDefault()
    history.push(`/team/${teamName}`)
  }

  const buttonClick = () => {
    setTeamName('')
    history.push(`/team/${teamName}`)
  }

  return (
    <>
      <div className='teamContainer'>
        <div className="teamSearch">
          <form onSubmit={searchTeam} style={{ display: 'flex', alignItems: 'center' }}>
            <MDBInput name='request' label='Search Your Fav Team' onChange={({target}) => setTeamName(target.value)} value={teamName} />
            <Button type="dashed" ghost style={{ marginLeft: 10 }} onClick={buttonClick}>
              Search
            </Button>
          </form>
        </div>
        <div className='fetchTeam'>
          <Switch>
            <Route path='/team/random' component={AllTeam}/>
            <Route path='/team/:name' component={SearchTeam} />
          </Switch>
        </div>
      </div>
    </>
  )
}