import React, { useState } from 'react'
import { Modal, Button, message } from 'antd';
import { MDBInput } from 'mdbreact'
import axios from '../../apis/server'

export default (props) => {
  const [ visible, setVisible ] = useState(false)
  const [ Loading, setLoading ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const showModal = () => {
    setVisible(!visible)
  }
  const messageNotif = (text) => {
    message.success(text);
  };
  const handleOk = () => {
    setLoading(true);
    axios({
      method: 'post',
      url: '/signup',
      data: { username, email, password }
    })
      .then(_ => {
        setLoading(false)
        setVisible(false)
        messageNotif('Success Signup u can signin now!')
      })
      .catch(err => {
        if(err.response.data.msg == 'validation error'){
          err.response.data.error.forEach(el => {
            message.warning(el)
          })
          setLoading(false)
        }else {
          message.warning(err.response.data.msg)
          setLoading(false)
        }
        // message.warning(err.response.dat)
      })
  }
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <>
    <div style={{ display: 'flex', alginItems: 'center', marginTop: '5px'}}>
      <Button style={{ width: '150px', height: '50px' }} type="primary" onClick={showModal}>
        Sign Up
      </Button>
    </div>
      <Modal
        title="Sign In"
        visible={visible}
        onOk={handleOk}
        confirmLoading={Loading}
        onCancel={handleCancel}
      >
      <img src="https://media0.giphy.com/media/Sgud4aA3gueFG/200.webp?cid=790b7611b41f90c21e55b4ff2891e11ad7b6dcd12163f856&rid=200.webp" alt="GIF" style={{ position: 'absolute', width: '100%', margin: '-100px -580px' }}/>
      <MDBInput name='request' label='Username' onChange={({target}) => setUsername(target.value)} value={username} />
      <MDBInput name='request' label='Email' onChange={({target}) => setEmail(target.value)} value={email} />
      <MDBInput name='request' label='Password' type='password' onChange={({target}) => setPassword(target.value)} value={password} />
      </Modal>
    </>
  )
}