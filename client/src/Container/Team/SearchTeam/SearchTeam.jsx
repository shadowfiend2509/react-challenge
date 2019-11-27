import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from '../../../apis/server'
import { message, Result } from 'antd'
import CardSearch from '../AllTeam/CardTeam'
import './SearchTeam.css'

export default () => {
  const [ searchTeam, setSearchTeam ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const history = useHistory()
  const { name } = useParams()

  useEffect(() => {
    const fetchTeam = () => {
      axios({
        method: 'get',
        url: `/dota/team/${name}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          setTimeout(() => {
            setLoading(false)
          }, 1000);
          setSearchTeam(data.team)
        })
        .catch(err => {
          if(err.response.data.msg == 'jwt malformed'){
            message.warning('Signin first for Search Your Team')
            history.push(`/team/random`)
          } else {
            console.log(err.response)
          }
        })
    }
    fetchTeam()
  }, [name])


  return (
    <>
      <div className="cardSearchTeam">
        <div>
          {
            (searchTeam.length !== 0)
              ? searchTeam.map(team => {
                  return <CardSearch data={team} loading={loading} />
                })
              : <div style={{ fontSize: '50px', color: 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
                  <Result 
                    status="404"
                  />
                  <p style={{ textAlign: 'center' }}>
                    Not Found!<br/>
                    Sorry, Hero with Name {name} does not exist !!
                  </p>
                </div>
          }
        </div>
      </div>
    </>
  )
}