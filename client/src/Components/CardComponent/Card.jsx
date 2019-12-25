import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AddToFav } from '../../store/Action'
import './Card.css'

export default (props) => {
  const history = useHistory()
  const {fav} = useSelector(state =>  state.storeFav)
  const [ isPath, setPath ] = useState(false)
  const [ isAdd, setAdd ] = useState(false)
  const [ isHere , setHere ] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if(history.location.pathname == '/fav') {
      setPath(true)
      setHere(false)
      setAdd(false)
    }else if(history.location.pathname == '/heroes') {
      setPath(false)
      setAdd(true)
      setHere(false)
    }
  }, [history.location.pathname, fav])
  
  useEffect(() => {
    console.log(fav)
    if(history.location.pathname == '/heroes') {
      setTimeout(() => {
        if(fav.HeroId !== undefined) {
          for(let i=0; i<fav.HeroId.length; i++) {
            if(fav.HeroId[i].id == props.hero.id){
              setHere(true)
              setPath(false)
              setAdd(false)
            }
          }
        } else {
          setAdd(true)
        }
      }, 1000);
    }
  }, [fav])
  const remove = () => {
    console.log(props.hero._id, '================')
    dispatch(AddToFav(props.hero._id))
  }

  return (
    <>
      <Card
        key={props.hero._id}
        style={{ width: 240 }}
        cover={<img alt="example" src={props.hero.vertical} />}
        >
        <div style={{ textAlign: 'center' }}>
          <b style={{ fontSize: '25px'}}>{props.hero.name}</b> <br></br>
          <div>
            {
              (isPath) ? <Button type={"danger"} block onClick={remove} >Remove </Button> : null
            }
            {
              (isAdd) ? <Button type={"primary"} block onClick={remove} >Add Fav </Button> : null
            }
            {
              (isHere) ? <Button type={"danger"} block onClick={remove} >Remove </Button> : null
            }
            <Button type={"dashed"} block onClick={() => history.push(`/detail/${props.hero.id}`)}> Show Detail</Button>
          </div>
        </div>
      </Card>
    </>
  )
}