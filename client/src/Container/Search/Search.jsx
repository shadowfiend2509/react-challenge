import React, { useEffect, useState, Fragment } from 'react'
import axios from '../../apis/server';
import { Card, Button } from 'antd';

import './Search.css'

export default (props) => {
  const [ heroes, setHeroes ] = useState([])
  useEffect( () => {
    fetchHeroes()
  }, [])

  useEffect( () => {
    fetchHeroes()
  }, [props.match.params.name])
  function fetchHeroes () {
    axios({
      method: 'get',
      url: `/hero/name/${props.match.params.name}`
    })
      .then(({data}) => {
        setHeroes(data.heroes)
      })
      .catch(console.log)
  }

  return ( 
    <Fragment>
      <div className='CardSearch'>
        {
          heroes.map(hero => {
            return (
              <div className="searchImg">
                <Card
                  key={hero._id}
                  style={{ width: 240 }}
                  cover={<img alt="example" src={hero.vertical} />}
                  >
                  Hero Name: <b>{hero.name}</b> <br></br>
                  <Button type="dashed" block>
                    Show Detail
                  </Button>
                </Card>
              </div>
            )
          })
        }
      </div>
    </Fragment>
  )
}