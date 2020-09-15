import React, { ReactPropTypes, Component } from 'react';
import Login from './Login';
import { Provider, connect, useDispatch, ConnectedProps } from 'react-redux';
import {Redirect, BrowserRouter as Router, Route} from 'react-router-dom';
import { Store, AnyAction, createStore } from 'redux';
import App from './App';
import { LOGIN, SIGNUP_USER } from './actions/types';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
}

class Home extends React.Component<Props> {
  
  constructor(props : Props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    }
    //bind the methods contained within to the class
  }

  render() {
    return(
      <Router>
        <Route path="/:filter?" render = {() => this.props.isAuthenticated ? App : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )} />
        <Route path="/login" component = {Login} />
      </Router>
    );
  }
}

interface RootState {
  isAuthenticated : boolean
}

const mapStateToProps = (state : RootState) => ({
  isAuthenticated : state.isAuthenticated
});

const mapDispatchToProps = () => {
  return {
    login : (flag : boolean) => ({
      type: LOGIN,
      payload: flag
    })
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Home);
