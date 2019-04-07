import React from 'react';
import ReactDOM from 'react-dom';
// import Hello from './components/hello/hello';
// import Bye from './components/bye/bye';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Loadable from 'react-loadable';

function App() {
    return (
        <div>
            <Hello name="Jimu" />
            <Bye name="Jimu" />
        </div>
    );
}
const Loading = () => <div>Loading...</div>;

const Hello = Loadable({
    loader: () => import(/* webpackChunkName: "hello" */'./components/hello/hello'),
    loading: Loading,
})

const Bye = Loadable({
    loader: () => import(/* webpackChunkName: "bye" */'./components/bye/bye'),
    loading: Loading,
})


function AppRouter() {
    return (
        <Router>
            <div>
                {/* <nav>
                    <ul>
                        <li>
                            <Link to="/">Hello</Link>
                        </li>
                        <li>
                            <Link to="/byebye">Byebye</Link>
                        </li>

                    </ul>
                </nav> */}

                <Route path="/" exact component={Hello} />
                <Route path="/byebye" component={Bye} />
            </div>
        </Router>
    );
}

ReactDOM.render(
    <AppRouter />,
    document.getElementById('root')
)
