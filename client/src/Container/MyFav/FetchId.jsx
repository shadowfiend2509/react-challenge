import React, { useState, useEffect } from 'react'
import axios from '../../apis/server'
import { message } from 'antd'
import CardComp from '../../Components/CardComponent/Card'


export default (props) => {
  const [ hero, setHeroes ] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: `/hero/${props.id}`
    })
      .then(({data}) => {
        setHeroes(data.hero)
      })
      .catch(err => {
        message.warning(err.response.data.msg)
      })
  }, [props.id])

  return (
    <> 
    <div style={{ marginLeft: 20 }}>
      {
        (hero)
          ? <CardComp hero={hero} />
          : null
      }
    </div>
    </>
  )
}