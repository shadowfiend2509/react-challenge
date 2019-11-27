import React, { useState, useEffect} from 'react'
import axios from '../../apis/server'
import { Result } from 'antd'
import Card from '../CardComponent/Card'

export default (props) => {

  const [hero, setHero] = useState({})

  useEffect(() => {
    const fetchHero = () => {
      axios({
        method: 'get',
        url: `/hero/${props.id}`
      })
        .then(({data}) => {
          setHero(data.hero)
        })
        .catch(console.log)
    }
    fetchHero()
  }, [])

  return (
    <>
      {
        (hero.vertical) ? <Card hero={hero} />
          :
          <div style={{ fontSize: '50px', color: 'white', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
            <Result 
              status="404"
            />
            <p style={{ textAlign: 'center' }}>
              Loading..
            </p>
          </div>
      }
    </>
  )
}