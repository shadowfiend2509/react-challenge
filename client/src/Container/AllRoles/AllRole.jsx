import React, { useState, useEffect } from 'react'
import axios from '../../apis/server'
import { Tag } from 'antd'
import { Switch, Route } from 'react-router-dom'
import './AllRole.css'
import RoleId from './RoleId/RoleId'
import TagComp from '../../Components/TagComp/TagComp'

export default () => {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    fetchRoles()
  }, [])
  
  function fetchRoles () {
    axios({
      method: 'get',
      url: '/dota/role/all'
    })
      .then(({data}) => {
        setRoles(data.role)
      })
      .catch(console.log)
  }
  return (
    <>
      <div className="mainRoles">
        <div className="topRoles">
          {
            (roles) ? roles.map(role => <TagComp role={role} />)  : <Tag color='volcano'> Empty </Tag>
          }
        </div>
        <div className="nestedRoles">
          <Switch>
            <Route path='/roles/:id' component={RoleId} />
          </Switch>
        </div>
      </div>
    </>
  )
}