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
    fetchRadiantWinRate()
    fetchDireWinRate()
  }, [])

  function fetchRadiantWinRate () {
    axios({
      method: 'get',
      url: `/dota/radiant/${id}`
    })
      .then(({data}) => {
        setRadiantWinRate(data)
      })
      .catch(console.log)
  }

  function fetchDireWinRate () {
    axios({
      method: 'get',
      url: `/dota/dire/${id}`
    })
      .then(({data}) => {
        setDireWinRate(data)
      })
      .catch(console.log)
  }
  const contentRadiant = (
    <>
      <p>Kill: {getRadiantWinRate.kill}</p>
      <p>Death: {getRadiantWinRate.death}</p>
      <p>Assist: {getRadiantWinRate.assist}</p>
    </>
  )
  const titleRadiant = (
    <>
      <p>Win Rate:{getRadiantWinRate.winRate} %</p>
    </>
  )
  const contentDire = (
    <>
      <p>Kill: {getDireWinRate.kill}</p>
      <p>Death: {getDireWinRate.death}</p>
      <p>Assist: {getDireWinRate.assist}</p>
    </>
  )
  const titleDire = (
    <>
      <p>Win Rate:{getDireWinRate.winRate} %</p>
    </>
  )
  const renderUpRadiant = (
    <Statistic
      title="Active"
      value={getRadiantWinRate.winRate}
      precision={2}
      valueStyle={{ color: '#3f8600' }}
      prefix={<Icon type="arrow-up" />}
      suffix="%"
    />
  )
  const renderDownRadiant = (
    <Statistic
      title="Active"
      value={getRadiantWinRate.winRate}
      precision={2}
      valueStyle={{ color: '#3f8600' }}
      prefix={<Icon type="arrow-down" />}
      suffix="%"
    />
  )
  const renderUpDire = (
    <Statistic
      title="Active"
      value={getDireWinRate.winRate}
      precision={2}
      valueStyle={{ color: '#3f8600' }}
      prefix={<Icon type="arrow-up" />}
      suffix="%"
    />
  )
  const renderDownDire = (
    <Statistic
      title="Active"
      value={getDireWinRate.winRate}
      precision={2}
      valueStyle={{ color: '#3f8600' }}
      prefix={<Icon type="arrow-down" />}
      suffix="%"
    />
  )

  useEffect(() => {
    getIdHero()
  }, [])

  function getIdHero () {
    axios({
      method: 'get',
      url: `/hero/${id}`
    })
      .then(({data}) => {
        setHeroServer(data.hero)
      })
      .catch(console.log)
  }

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