import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RaceRunners from './components/race-runners';
import store from './redux/store';

import './global-styles.scss';

ReactDOM.render(
    <React.StrictMode>
        <Provider store = {store}>
            <RaceRunners/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);