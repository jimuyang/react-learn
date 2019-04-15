import React from 'react'
import { Row, Col, Menu, Icon } from 'antd';

import IconFont from '@/iconfont'
import style from './header.css'

// console.log(style)
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class PcHeader extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <div style={{ display: 'flex' }}>
                            <div><IconFont type="iconnews1" style={{ fontSize: '80px' }} /></div>
                            <div className={style['main-title']}>React News</div>
                        </div>
                    </Col>
                    <Col span={16}>
                        <Menu
                            // onClick={this.handleClick}
                            // selectedKeys={[this.state.current]}
                            style={{ fontSize: '25px' }}
                            mode="horizontal" >
                            <Menu.Item key="top">
                                <Icon type="mail" />头条</Menu.Item>
                            <Menu.Item key="social">
                                <Icon type="mail" />社会</Menu.Item>
                            <Menu.Item key="domestic">
                                <Icon type="mail" />国内</Menu.Item>
                            <Menu.Item key="international">
                                <Icon type="mail" />国际</Menu.Item>
                            <Menu.Item key="entertainment">
                                <Icon type="mail" />娱乐</Menu.Item>
                            {/* <Menu.Item key="app" disabled>
                                <Icon type="appstore" />Navigation Two </Menu.Item>
                            <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
                                <MenuItemGroup title="Item 1">
                                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                                </MenuItemGroup>
                                <MenuItemGroup title="Item 2">
                                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                            <Menu.Item key="alipay">
                                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
                            </Menu.Item> */}
                        </Menu>
                    </Col>
                </Row>
            </div >
        );
    }
}

