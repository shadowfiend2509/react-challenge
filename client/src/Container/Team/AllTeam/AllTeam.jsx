import React, { useState, useEffect } from 'react'
import axios from '../../../apis/server'
import CardTeam from './CardTeam'

export default () => {
  const [ teams, setTeams ] = useState([])
  const [ loading, setLoading ] = useState(true)
  
  useEffect(() => {
    console.log('trigger')
    const fetchTeam = () => {
      axios({
        method: 'get',
        url: '/dota/team'
      })
        .then(({data}) => {
          setTimeout(() => {
            setLoading(false)
          }, 1000);
          console.log(data)
          setTeams(data.team)
        })
        .catch(console.log)
    }
    fetchTeam()
  }, [])
  
  return (
    <>
      {
        teams.map(team => {
          return <CardTeam data={team} loading={loading}/>
        })
      }
    </>
  )
}