import React, {useEffect} from 'react'
import { Tag } from 'antd'
import { useHistory } from 'react-router-dom'

export default (props) => {
  const history = useHistory()
  useEffect(() => {
    history.push(`/roles/${props.role}`)
  }, [props.role])
  return <Tag onClick={() => history.push(`/roles/${props.role}`)} color='volcano' style={{ cursor: 'pointer', height: '35px', fontSize: '30px'}}> { props.role }</Tag>
}