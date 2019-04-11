import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from "react-router-dom";


import PcIndex from './components/pc/index'


function AppRouter() {
    return (
        <Router>
            <div>
                <Route path="/" exact component={PcIndex} />
                {/* <Route path="/about/" component={About} /> */}
                {/* <Route path="/users/" component={Users} /> */}
            </div>
        </Router>
    );
}

ReactDOM.render(<AppRouter />, document.getElementById('root'))
