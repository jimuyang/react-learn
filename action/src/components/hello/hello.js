import React from 'react';
import outStyle from './hello.css';

console.log(outStyle);

const style = {
    h1: {
        color: "red"
    }
}
/**
 * 组件名称必须以大写字母开头。 
 * 例如，<div /> 表示一个DOM标签，但 <Welcome /> 表示一个组件，并且在使用该组件时你必须定义或引入它。
 */
export default class Hello extends React.Component {
    render() {
        return (
            <header>
                <h1 style={style.h1}>Hello, {this.props.name}</h1>
            </header>
        );
    }
}