import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import Home from './Home';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import reducers from './reducers/appstore';
import {Provider} from 'react-redux';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
