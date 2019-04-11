import React from 'react'
import { Row, Col } from 'antd';

import IconFont from '@/iconfont'
import style from './header.css'

// console.log(style)

export default class PcHeader extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}><IconFont type="iconnews1" className={style['main-icon']} /></Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}

