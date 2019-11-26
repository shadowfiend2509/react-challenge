import React, { useEffect, useState } from 'react'
import Card from '../../Components/CardComponent/Card'
import axios from '../../apis/server'

export default () => {
  const [heroes, setHeroes] = useState([])
  useEffect(() => fetchHeroes(), [])
  function fetchHeroes () {
    axios({
      method: 'get',
      url: '/hero'
    })
      .then(({data}) => {
        setHeroes(data.heroes)
      })
      .catch(console.log)
  }
  return (
    <>
      <div className='CardSearch'>
        {
          heroes.map(hero => <div className="searchImg"> <Card hero={hero}/> </div>)
        }
      </div>
    </>
  )
}