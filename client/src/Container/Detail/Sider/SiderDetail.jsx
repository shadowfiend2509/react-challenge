import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Card, Icon, Avatar, Popover, Statistic } from 'antd'
import axios from '../../../apis/server';

export default () => {
  const [ getHeroServer, setHeroServer ] = useState({})
  const { id } = useParams(); 
  const { Meta } = Card;

  const [ getRadiantWinRate, setRadiantWinRate ] = useState({})
  const [ getDireWinRate, setDireWinRate ] = useState({})

  useEffect( () => {
    const fetchRadiantWinRate = () => {
      axios({
        method: 'get',
        url: `/dota/radiant/${id}`
      })
        .then(({data}) => {
          setRadiantWinRate(data)
        })
        .catch(console.log)
    }
    const fetchDireWinRate = () => {
      axios({
        method: 'get',
        url: `/dota/dire/${id}`
      })
        .then(({data}) => {
          setDireWinRate(data)
        })
        .catch(console.log)
    }
    fetchRadiantWinRate()
    fetchDireWinRate()
  }, [])

  useEffect(() => {
    const getIdHero = () => {
      axios({
        method: 'get',
        url: `/hero/${id}`
      })
        .then(({data}) => {
          setHeroServer(data.hero)
        })
        .catch(console.log)
    }
    getIdHero()
  }, [])

  return (
    <>
    <div className='CardDetail'>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="Hero_image"
            src={getHeroServer.vertical}
          />
        }
        actions={[
          <div style={{ alignItems: 'center', margin: '10px auto' }}>
            <Popover content={getHeroServer.name} title='Add to Fav' trigger="hover">
              <Icon size={200} type="plus" key="setting" />
            </Popover>
          </div>,
          <>
          {
            (Number(getRadiantWinRate.winRate) === 50.00) ? 
            <Statistic
              title="Radiant Win"
              value={getRadiantWinRate.winRate}
              precision={2}
              valueStyle={{ color: 'grey', fontSize: '20px' }}
              prefix={<Icon type="minus" />}
              suffix="%"
            /> : 
            (Number(getRadiantWinRate.winRate) > 50) ? 
            <Statistic
              title="Radiant Win"
              value={getRadiantWinRate.winRate}
              precision={2}
              valueStyle={{ color: '#3f8600', fontSize: '19px' }}
              prefix={<Icon type="arrow-up" />}
              suffix="%"
            /> : 
            <Statistic
              title="Radiant Win"
              value={getRadiantWinRate.winRate}
              precision={2}
              valueStyle={{ color: 'red', fontSize: '20px' }}
              prefix={<Icon type="arrow-down" />}
              suffix="%"
            />
          }
          </>,
          <>
            {
              (Number(getDireWinRate.winRate) === 50.00) ? 
              <Statistic
                title="Dire Win"
                value={getDireWinRate.winRate}
                precision={2}
                valueStyle={{ color: 'grey', fontSize: '20px' }}
                prefix={<Icon type="minus" />}
                suffix="%"
              /> : 
              (Number(getDireWinRate.winRate) > 50) ? 
              <Statistic
                title="Dire Win"
                value={getDireWinRate.winRate}
                precision={2}
                valueStyle={{ color: '#3f8600', fontSize: '19px' }}
                prefix={<Icon type="arrow-up" />}
                suffix="%"
              /> : 
              <Statistic
                title="Dire Win"
                value={getDireWinRate.winRate}
                precision={2}
                valueStyle={{ color: 'red', fontSize: '20px' }}
                prefix={<Icon type="arrow-down" />}
                suffix="%"
              />
            }
          </>,
        ]}
      >
        <Meta
          avatar={<Avatar src={getHeroServer.small} />}
          title={getHeroServer.name}
        />
      </Card>
    </div>
    </>
  )
}