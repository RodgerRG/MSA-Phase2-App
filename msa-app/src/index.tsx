import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Login from './components/Login';
import Home from './components/Home';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import reducers from './reducers/appstore';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

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
