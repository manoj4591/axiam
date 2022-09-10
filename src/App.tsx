import React, { FC, useState } from 'react';
import { Layout, Row, Col, Button, Input, notification } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import './App.css'
import softwares from './data/software';
import { softwareObj } from './models/software';
// import axios from "axios";

const { Content } = Layout;

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const App: FC = () => {
  const [searchField, setSearchField] = useState<string>('');
  const [searchShow, setSearchShow] = useState<boolean>(false);
  const [selectedId, setSelectedIds] = useState<softwareObj[]>([]);

  const filteredSoftwares = softwares.filter(
    software => {
      return (
        software
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setSearchField(inputValue);
    if(inputValue === ""){
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
  };

  const divHandler = (newElement: softwareObj): void => {
    if(selectedId.includes(newElement)){
      setSelectedIds(selectedId.filter(selected => { return selected !== newElement;}))
    } else {
      setSelectedIds(oldArray => [...oldArray, newElement])
    }
  };

  const listItems = filteredSoftwares.map(software =>{
    return (
      <div className={`softwareClass ${selectedId.includes(software) ? "active" : ""}`} key={software.id} onClick={() => {divHandler(software)}}>
        <div className="softwareIcon"><img src={software.avatar} alt={software.name}/></div>
        <div className="softwareName">{software.name}</div>
        <div className={`icon ${selectedId.includes(software) ? "show" : "hide"}`} ><CheckOutlined/></div>
      </div>
    )
  });
 
  const searchList = () =>{
    if (searchShow) {
      return (
        <>
          <div className="listBox">{listItems}
          </div>
        </>
      );
    }
  }

  const remainList = (num : number) => {
    if(num > 0) {
        let remainingItems : any[] = [];
        for (let i = 0; i < num; i++) {
          remainingItems.push(
            <Col className="gutter-row" key={'item_' + i} xs={24} sm={24} md={12} lg={12} xl={12}>
              <div className="outerBox">
                <div className="innerBox">
                  <PlusOutlined className='iconColor' />
                </div>
              </div>
            </Col>
          );
        }
        return (
          <>
            {remainingItems}
          </>
        );
    }
  }

  const boxList = () => {
    let remainingSelected = 4 - selectedId.length;
      return (
        <>
          {boxItems}
          {remainList(remainingSelected)}
        </>
      );
  }

  const boxItems = selectedId.map(software => {
    return (
      <Col className="gutter-row" key={software.id} xs={24} sm={24} md={12} lg={12} xl={12}>
        <div className="outerBox">
          <div className="innerImageBox">
            <div className="image"><img src={software.avatar} alt={software.name}/></div>
            <div className="softname">{software.name}</div>
          </div>
          <div className="remove" onClick={() => {divHandler(software)}}><CloseOutlined className='iconred' /> Remove</div>
        </div>
      </Col>
    )
  })

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: 'Data Submitted',
      description:
        'Softwares send Successfully.',
    });
  };

  const onSubmit = () => {
    // axios.post(baseURL, {
    //   selectedIds: selectedId,
    // })
    // .then((response) => {
    //   openNotificationWithIcon('success');
    //   setSelectedIds([]);
    // });
    openNotificationWithIcon('success');
    setSelectedIds([]);
  };

  return (
    <>
      <Layout style={{ background: '#fff' }}>
        <Content className="contentBox">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div style={{ background: '#fff', padding: '8px 0' }}><h1>axiamatic</h1></div>
              </Col>
              <Col className="gutter-row" xs={12} sm={12} md={12} lg={12} xl={12}>
                  <div className="exit">Exit Setup</div>
              </Col>
          </Row>
          <Row className="mainContent" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row leftSpace" xs={24} sm={24} md={12} lg={10} xl={10}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {boxList()}
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={24} xl={24}>
                  <div className="textBoxs">
                      {selectedId.length} Products are added.
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="gutter-row rightSpace" xs={24} sm={24} md={12} lg={10} xl={10} offset={4}>
              <div className='mainDiv'>
                <div className="badges">1 of 3</div>
                <div className="heading"><h2>Let's add your internal tools</h2></div>
                <div className="description">Search to quickly add products your team uses today. You'll be able to add as many as you need later but for now let's add four</div>
                <div className="searchbar">
                  <div className="inputbox">
                    <Input onChange={handleChange} size="large" placeholder="Search for any software ..." prefix={<SearchOutlined />} />
                  </div>
                  {searchList()}
                </div>
                <div className="btnMain"><Button size="large" onClick={onSubmit} className={`${selectedId.length > 0 ? "primary" : "disabled"}`}  disabled={selectedId.length > 0 ? false : true}>Primary Button</Button></div>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default App;