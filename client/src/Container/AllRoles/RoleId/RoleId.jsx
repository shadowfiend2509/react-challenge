import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import RoleIdComponent from '../../../Components/RoleIdComponent/RoleIdComponent'
import axios from '../../../apis/server';

export default () => {
  const [getId, setId] = useState([])
  const { id } = useParams()

  useEffect(() => {
    setId([])
    const fetchId = () => {
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
    fetchId()
  }, [id])

  return (
    <>
      {
        (getId) ? getId.map(id => <RoleIdComponent id={id} />) : <p>Empty</p>
      }
    </>
  )
}