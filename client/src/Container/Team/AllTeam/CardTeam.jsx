import React from 'react'
import { Skeleton, Card, Icon, Avatar } from 'antd';

export default (props) => {
  const {Meta} = Card
  return (
    <>
      <Card
        style={{ width: 500, marginLeft: 10, marginTop: 16, }}
        actions={[
          `${props.data.wins} Wins`,
          `${props.data.losses} Losses`,
          `${props.data.rating} Rating`,
        ]}
        disabled
      >
      <Skeleton loading={props.loading} avatar active>
        <Meta
          avatar={
            <Avatar src={props.data.logo_url} />
          }
          title={props.data.name}
          description={`Team ID ${props.data.team_id}`}
        />
      </Skeleton>
      </Card>
    </>
  )
}