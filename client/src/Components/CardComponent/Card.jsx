import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Button } from 'antd';
import './Card.css'

export default (props) => {
  const history = useHistory()
  
  return (
    <>
      <Card
        key={props.hero._id}
        style={{ width: 240 }}
        cover={<img alt="example" src={props.hero.vertical} />}
        >
        <b style={{ fontSize: '25px'}}>{props.hero.name}</b> <br></br>
        <Button type={"dashed"} block onClick={() => history.push(`/detail/${props.hero.id}`)}> Show Detail</Button>
      </Card>
    </>
  )
}