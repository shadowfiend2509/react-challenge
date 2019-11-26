import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardSearch from '../../Components/CardComponent/Card';
import axios from '../../apis/server';

import './Search.css'

export default (props) => {
  const [ heroes, setHeroes ] = useState([])
  const { name } = useParams()
  
  useEffect( () => {
    const fetchHeroes = () => {
      axios({
        method: 'get',
        url: `/hero/name/${name}`
      })
        .then(({data}) => {
          setHeroes(data.heroes)
        })
        .catch(console.log)
    }
    fetchHeroes()
  }, [name])

  return ( 
    <>
      <div className='CardSearch'>
        {
          heroes.map(hero => {
            return (
              <div className="searchImg">
                <CardSearch hero={hero}/>
              </div>
            )
          })
        }
      </div>
    </>
  )
}