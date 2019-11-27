import React, { useState } from 'react'
import { Modal, Button, message } from 'antd';
import { MDBInput } from 'mdbreact'
import { useDispatch } from 'react-redux'
import { signin } from '../../store/Action'
import axios from '../../apis/server'
// import { GoogleLogin } from 'react-google-login'

export default (props) => {
  const [ visible, setVisible ] = useState(false)
  const [ Loading, setLoading ] = useState(false)
  const [ request, setRequest ] = useState('')
  const [ password, setPassword ] = useState('')
  const dispatch = useDispatch()

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
      url: '/signin',
      data: { request, password }
    })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        dispatch(signin())
        setLoading(false)
        setVisible(false)
        messageNotif('Welcome to Doto')
      })
      .catch(err => {
        message.warning(err.response.data.msg)
      })
  }
  // const responseGoogle = (response) => {
  //   console.log(response)
  //   const token = response.tokenObj.id_token
  //   setLoading(true);
  //   axios({
  //     method: 'post',
  //     url: '/signingoogle',
  //     data: {
  //       id_token: token
  //     }
  //   })
  //     .then(({data}) => {
  //       localStorage.setItem('token', data.token)
  //       setTimeout(() => {
  //         setLoading(false)
  //         setVisible(false)
  //         // messageNotif(`Google Signin Success, welcome ${user.name}`)
  //       }, 1000);
  //     })
  //     .catch(err => {
  //       console.log(err.response)
  //       message.warning(err.response.data.msg)
  //     })
  // }
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <>
    <div style={{ display: 'flex', alginItems: 'center', marginTop: '5px'}}>
      <Button style={{ width: '150px', height: '50px' }} type="primary" onClick={showModal}>
        Sign In
      </Button>
    </div>
      <Modal
        title="Sign In"
        visible={visible}
        onOk={handleOk}
        confirmLoading={Loading}
        onCancel={handleCancel}
      >
      <img src="https://media3.giphy.com/media/eHKM1zH4JBMk/giphy.gif?cid=790b76119dd91721404bff65de91232ddd7a9518aded24ea&rid=giphy.gif" alt="GIF" style={{ position: 'absolute', width: '100%', margin: '-100px -580px' }}/>
      <MDBInput name='request' label='Email / Username' onChange={({target}) => setRequest(target.value)} value={request} />
      <MDBInput name='request' label='password' type='password' onChange={({target}) => setPassword(target.value)} value={password} />
      {/* <GoogleLogin
        clientId="917355642899-pqjp8dcnrrr7237hqmdeu1rf549piu65.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> */}
      </Modal>
    </>
  )
}