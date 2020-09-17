import React, { ReactPropTypes, Component } from 'react';
import Login from './Login';
import { Provider, connect, useDispatch, ConnectedProps } from 'react-redux';
import {Redirect, Router, Route, Switch} from 'react-router-dom';
import { Store, AnyAction, createStore } from 'redux';
import { LOGIN, SIGNUP_USER } from '../actions/types';
import {login} from '../actions/loginActions';
import history from './history';
import Dashboard from './JobBoard';
import App from './App';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  isAuthenticated: boolean
}

class Home extends React.Component<Props, RootState> {
  
  constructor(props : Props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
    }
    //bind the methods contained within to the class
  }

  render() {
    return(
      <Router history={history}>
          <Route path="/" render = {() => this.state.isAuthenticated ? (
            <Redirect
            to={{
              pathname: "/home"
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )} />
        <Route path="/login" component = {Login} />
        <Route path="/home" component = {App} />
        <Route path="/boards" component = {Dashboard} />
      </Router>
    );
  }
}

interface RootState {
  isAuthenticated : boolean
}

const mapStateToProps = (state : any) => ({
  isAuthenticated : state.loginState.isAuthenticated
});

const connector = connect(mapStateToProps);

export default connector(Home);
