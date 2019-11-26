import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../../apis/server'
import { Card, Tag } from 'antd'
import { useHistory } from 'react-router-dom'
import './ContentDetail.css'

export default () => {
  const { id } = useParams()

  const [ heroDetail, setHeroDetail ] = useState({})
  const history = useHistory()

  useEffect(() => {
    const fetchHeroDetail = () => {
      axios({
        method: 'get',
        url: `/dota/${id}`
      })
        .then(({data}) => {
          console.log(data.hero)
          setHeroDetail(data.hero)
        })
        .catch(console.log)
    }
    fetchHeroDetail()
  }, [])


  return (
    <>
      <Card title='Detail Hero' bordered={false} style={{ width: '100%' }}>
        <div className='cardHero'>
          <div className='textHero'>
            <p>Type :</p> &nbsp;
            <p>{heroDetail.attack_type}</p>
          </div>
          <div className='textHero'>
            <p>Roles :</p> &nbsp;
            <div style={{ display: 'flex' }}>
              {
                (heroDetail.roles) ? heroDetail.roles.map(role => <Tag onClick={() => history.push(`/roles/${role}`)} color="volcano" style={{ fontSize: '20px', height: '50px', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>{ role }</Tag>) : <Tag color='geekblue'>Empty</Tag>
              }
            </div>
          </div>
          <div className='textHero'>
            <p>Type Attr :</p>  &nbsp;
            <p>{heroDetail.primary_attr}</p>
          </div>
          <div className='textHero'>
            <p>Base Health :</p>  &nbsp;
            <p>{heroDetail.base_health} HP</p>
          </div>
          <div className='textHero'>
            <p>Base Mana : </p>  &nbsp; 
            <p>{heroDetail.base_mana} MP</p>
          </div>
          <div className='textHero'>
            <p>Base STR : </p>  &nbsp; 
            <p>{heroDetail.base_str}</p>
          </div>
          <div className='textHero'>
            <p>Base INT : </p>  &nbsp; 
            <p>{heroDetail.base_int}</p>
          </div>
          <div className='textHero'>
            <p>Base AGI : </p>  &nbsp; 
            <p>{heroDetail.base_agi}</p>
          </div>
          <div className='textHero'>
            <p>STR Gain : </p>  &nbsp; 
            <p>{heroDetail.str_gain}</p>
          </div>
          <div className='textHero'>
            <p>INT Gain : </p>  &nbsp; 
            <p>{heroDetail.int_gain}</p>
          </div>
          <div className='textHero'>
            <p>AGI Gain : </p>  &nbsp; 
            <p>{heroDetail.agi_gain}</p>
          </div>
          <div className='textHero'>
            <p>Attack Range : </p>  &nbsp; 
            <p>{heroDetail.attack_range}</p>
          </div>
          <div className='textHero'>
            <p>Move Speed : </p>  &nbsp; 
            <p>{heroDetail.move_speed}</p>
          </div>
          <div className='textHero'>
            <p>1st Pick WinRate : </p>  &nbsp; 
            <p>{((heroDetail['1_win']/heroDetail['1_pick']*100)).toFixed(2)} %</p>
          </div>
          <div className='textHero'>
            <p>2nd Pick WinRate : </p>  &nbsp; 
            <p>{((heroDetail['2_win']/heroDetail['2_pick']*100)).toFixed(2)} %</p>
          </div>
          <div className='textHero'>
            <p>3rd Pick WinRate : </p>  &nbsp; 
            <p>{((heroDetail['3_win']/heroDetail['3_pick']*100)).toFixed(2)} %</p>
          </div>
          <div className='textHero'>
            <p>4th Pick WinRate : </p>  &nbsp; 
            <p>{((heroDetail['4_win']/heroDetail['4_pick']*100)).toFixed(2)} %</p>
          </div>
          <div className='textHero'>
            <p>5th Pick WinRate : </p>  &nbsp; 
            <p>{((heroDetail['5_win']/heroDetail['5_pick']*100)).toFixed(2)} %</p>
          </div>
          <div className='textHero'>
            <p>6th Pick WinRate : </p>  &nbsp; 
            <p>{((heroDetail['6_win']/heroDetail['6_pick']*100)).toFixed(2)} %</p>
          </div>
          <div className='textHero'>
            <p>7th Pick WinRate : </p>  &nbsp; 
            <p>{((heroDetail['7_win']/heroDetail['7_pick']*100)).toFixed(2)} %</p>
          </div>
          <div className='textHero'>
            <p>8th Pick WinRate : </p>  &nbsp; 
            <p>{((heroDetail['8_win']/heroDetail['8_pick']*100)).toFixed(2)} %</p>
          </div>
        </div>
      </Card>
    </>
  )
}

// "attack_range": 150,
// "projectile_speed": 0,
// "attack_rate": 1.4,
// "move_speed": 310,
// "turn_rate": 0.5,
// "cm_enabled": true,
// "legs": 2,
// "pro_win": 21,
// "pro_pick": 35,
// "hero_id": 1,
// "pro_ban": 67,
// "1_pick": 7010,
// "1_win": 3410,
// "2_pick": 21364,
// "2_win": 10595,
// "3_pick": 34562,
// "3_win": 17115,
// "4_pick": 40584,
// "4_win": 20199,
// "5_pick": 28966,
// "5_win": 14278,
// "6_pick": 11653,
// "6_win": 5750,
// "7_pick": 3383,
// "7_win": 1686,
// "8_pick": 231,
// "8_win": 96,
// "null_pick": 1943313,
// "null_win": 0