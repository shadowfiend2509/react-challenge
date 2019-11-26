import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

import SiderBar from './Sider/SiderDetail'
import ContentBar from './Content/ContentDetail'

export default () => {
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <>
      <Layout>
        <Sider style={{ backgroundColor: '#282C33', display: 'flex', justifyContent: 'center' }} width='500'>
          <SiderBar />
        </Sider>
        <Layout>
          <Header style={{ backgroundColor: '#282C33', color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '50px' }}>DC Dota2</Header>
          <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ContentBar />
          </Content>
          <Footer>POWERED BY DREAMCAROFFICIAL</Footer>
        </Layout>
      </Layout>
    </>
  )
}