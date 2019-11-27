import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FetchId from './FetchId'
import { Empty, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import './MyFav.css'

export default () => {
  let {fav} = useSelector(state => state.storeFav)
  const {user} = useSelector(state => state.storeUser)
  const [ tempId, setId ] = useState([])
  const history = useHistory()

  useEffect(() => {
    setId(fav.HeroId)
  }, [fav.HeroId])
  return (
    <>
    <div className="contentFav">
      <div className='textTop'>
        <h1 style={{ color: 'white' }}>Welcome <b>{user.username}</b></h1>
      </div>
      <div className="btnCard">
        {
          (tempId) 
            ? 
            tempId.map(id => {
              return <FetchId id={id} />
            })
            :
            <Empty
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              imageStyle={{
                height: 500,
              }}
              description={
                <span style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>
                  ooops your favorite bag is empty, let's choose your favorite hero
                </span>
              }
            >
              <Button type="primary" onClick={() => history.push('/heroes')}>Find Heroes</Button>
            </Empty>
        }
      </div>
    </div>
    </>
  )
}