import React, { useState } from 'react'
import { Modal, Button, message } from 'antd';
import { MDBInput } from 'mdbreact'
import { useSelector, useDispatch } from 'react-redux'
import { signin } from '../../Action/'
import axios from '../../apis/server'

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
        console.log(err)
        // messageNotif(err.response.data.msg)
      })
    //axios
  }

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
      <MDBInput name='request' label='Email / Username' onChange={({target}) => setRequest(target.value)} value={request} />
      <MDBInput name='request' label='password' type='password' onChange={({target}) => setPassword(target.value)} value={password} />
      </Modal>
    </>
  )
}
/*

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal with async logic
        </Button>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );

*/