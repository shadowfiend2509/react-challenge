import React, { useState, useEffect} from 'react'
import axios from '../../apis/server'

import Card from '../CardComponent/Card'

export default (props) => {

  const [hero, setHero] = useState({})

  useEffect(() => {
    console.log(props.id)
    fetchHero()
  }, [])

  function fetchHero () {
    axios({
      method: 'get',
      url: `/hero/${props.id}`
    })
      .then(({data}) => {
        setHero(data.hero)
      })
      .catch(console.log)
  }
  return (
    <>
      {
        (hero.vertical) ? <Card hero={hero} /> : <p>Empty</p>
      }
    </>
  )
}