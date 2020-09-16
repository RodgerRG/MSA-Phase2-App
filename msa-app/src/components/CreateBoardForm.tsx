import React, { ReactPropTypes, Component, FormEvent } from 'react';
import Login from './Login';
import { Provider, connect, useDispatch, ConnectedProps } from 'react-redux';
import {Redirect, Router, Route, Switch} from 'react-router-dom';
import { Store, AnyAction, createStore, Dispatch } from 'redux';
import App from './App';
import { LOGIN, SIGNUP_USER } from '../actions/types';
import {login} from '../actions/loginActions';
import history from './history';
import Dashboard from './JobBoard';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  
}

class CreateBoardForm extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props)

        this.state = {
            userId: this.props.userId
        }

        this.postBoard = this.postBoard.bind(this);
    }

    postBoard(event : FormEvent) {
        event.preventDefault();

        const postBoardRequestOptions = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId: this.state.userId})
        } as RequestInit;

        fetch("https://phase2-api.azurewebsites.net/api/Boards/addBoard", postBoardRequestOptions)
            .then(async response => {
                if(response.status == 200) {

                } else {
                    console.log("bad post");
                }
            }).catch(error => {

            });
    }

    render() {
        const formstyle =  {
            color: "#CDCEBE",
            padding: "1vw",
            fontFamily: "Arial",
            alignContent: "center",
            height: "8vh"
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
            width: "100%",
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
                <FormGroup>
                    <Button style={ButtonStyle} onClick={this.postBoard}>Create New Board</Button>
                </FormGroup>
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
  
export default connector(CreateBoardForm);