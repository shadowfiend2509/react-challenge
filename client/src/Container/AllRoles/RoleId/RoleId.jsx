import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import RoleIdComponent from '../../../Components/RoleIdComponent/RoleIdComponent'
import axios from '../../../apis/server';

export default () => {
  const [getId, setId] = useState([])
  const { id } = useParams()

  useEffect(() => {
    setId([])
    fetchId()
  }, [id])

  function fetchId () {
    axios({
      method: 'get',
      url: `/dota/role/${id}`
    })
      .then(({data}) => {
        console.log(data)
        setId(data.hero)
      })
      .catch(console.log)
  }
  return (
    <>
      {
        (getId) ? getId.map(id => <RoleIdComponent id={id} />) : <p>Empty</p>
      }
    </>
  )
}