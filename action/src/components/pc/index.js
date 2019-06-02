import React from 'react'

import PcHeader from './header/header'

export default class PcIndex extends React.Component {

    change(e) {
        console.log(e);
        console.log("changed");

    }

    render() {
        return <PcHeader />;
    }

    // render() {
        // return <input type="text" onBlur={e => this.change(e)} />;
    // }
}