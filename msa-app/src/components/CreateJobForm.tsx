import React, { ReactPropTypes, Component } from 'react';
import Login from './Login';
import { Provider, connect, useDispatch, ConnectedProps } from 'react-redux';
import {Redirect, Router, Route, Switch} from 'react-router-dom';
import { Store, AnyAction, createStore, Dispatch } from 'redux';
import App from './App';
import { LOGIN, SIGNUP_USER } from '../actions/types';
import {login} from '../actions/loginActions';
import history from './history';
import Dashboard from './JobBoard';
import { Form, Button } from 'react-bootstrap';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  
}

class CreateJobForm extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    render() {
        const formstyle =  {
            color: "#CDCEBE",
            padding: "1vw",
            fontFamily: "Arial",
            alignContent: "center",
            height: "34.9vh"
        } as React.CSSProperties;
    
        const formGroupStyle = {
            paddingLeft: "14%",
            alignItems: "center",
            position: "relative",
        } as React.CSSProperties;
    
        const formLabelStyle = {
            fontSize: "1vw",
        } as React.CSSProperties;
    
        const formControlStyle = {
            width: "80%",
            fontSize: "0.7vw",
            textAlign: "center"
        } as React.CSSProperties;
    
        const formRowStyle = {
            position: "relative",
            paddingLeft: "22%",
            paddingTop: "5%",
        } as React.CSSProperties;
    
        const ButtonStyle = {
            width: "70%",
            fontSize: "1vw",
            fontFamily: "Comic Sans MS"
        } as React.CSSProperties;
    
        const formTextStyle = {
            position: "relative",
            paddingLeft: "22%",
            fontSize: "0.7vw",
        } as React.CSSProperties;

        return(
            <Form style={formstyle}>

            </Form>);
    }
}

interface RootState {
    userId : number
}

type State = RootState & {
    
}
  
const mapStateToProps = (state : RootState) => ({
    userId : state.userId
});

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        
    }
}
  
const connector = connect(mapStateToProps, mapDispatchToProps);
  
export default connector(CreateJobForm);