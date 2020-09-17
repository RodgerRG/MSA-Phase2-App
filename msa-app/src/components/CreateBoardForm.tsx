import React, { ReactPropTypes, Component, FormEvent, ChangeEvent } from 'react';
import Login from './Login';
import { Provider, connect, useDispatch, ConnectedProps } from 'react-redux';
import {Redirect, Router, Route, Switch} from 'react-router-dom';
import { Store, AnyAction, createStore, Dispatch } from 'redux';
import App from './App';
import { LOGIN, SIGNUP_USER, BoardType } from '../actions/types';
import {login} from '../actions/loginActions';
import history from './history';
import Dashboard from './JobBoard';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { createBoard } from '../actions/postingActions';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  
}

class CreateBoardForm extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props)

        this.state = {
            userId: this.props.userId,
            boardName : "",
            token : ""
        }

        this.postBoard = this.postBoard.bind(this);
        this.boardNameChange = this.boardNameChange.bind(this);
    }

    formFeedbackStyle = {
        position : "relative",
        paddingTop: "0.1vh",
        fontSize: "0.7vw"
    } as React.CSSProperties;

    feedback = (
        <div>
        </div>
    );

    boardNameChange(event : ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState ({
            boardName : event.currentTarget.value
        });
    }

    badBoardCreation = (
        <Form.Control.Feedback style = {this.formFeedbackStyle}>
            Failed to create board :'(
        </Form.Control.Feedback>
    )

    postBoard(event : FormEvent) {
        event.preventDefault();
        this.feedback = (<div></div>);

        const postBoardRequestOptions = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Authorization": "Bearer " + this.props.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({boardId : 0, boardName : this.state.boardName, ownerId : this.state.userId, jobs : []})
        } as RequestInit;

        console.log(postBoardRequestOptions);

        fetch("https://phase2-api.azurewebsites.net/api/Boards", postBoardRequestOptions)
            .then(async response => {
                if(response.status == 201) {
                    let newBoard : BoardType = await response.json();
                    this.props.createBoard(newBoard);
                } else {
                    console.log("bad post");
                    console.log(await response.json());
                    this.feedback = this.badBoardCreation;
                }
            }).catch(error => {
                //do something.
                this.feedback = this.badBoardCreation;
                this.props.createBoard({
                    boardId : 14,
                    ownerId: 2,
                    jobs: []
                });
            });
    }

    render() {
        const formstyle =  {
            color: "#CDCEBE",
            padding: "1vw",
            fontFamily: "Arial",
            alignContent: "center",
            height: "18vh"
        } as React.CSSProperties;

        const formGroupStyle = {
            position: "relative",
            color: '#2C3539',
            textAlign: 'center',
            alignItems: 'center'
        } as React.CSSProperties;

        const formControlStyle = {
            width: "100%",
            fontSize: "0.7vw",
            textAlign: "center"
        } as React.CSSProperties;
    
        const formLabelStyle = {
            fontSize: "2vh",
            fontFamily : "Comic Sans MS",
        } as React.CSSProperties;
    
        const ButtonStyle = {
            width: "100%",
            fontSize: "1vw",
            fontFamily: "Comic Sans MS"
        } as React.CSSProperties;

        const formRowStyle = {
            position: "relative",
        } as React.CSSProperties;

        return(
            <Form style={formstyle}>
                <FormGroup style = {formGroupStyle}>
                    <Form.Label style= {formLabelStyle}>Board Name:</Form.Label>
                    <Form.Control required style = {formControlStyle} type="name" placeholder="Board Name" value = {this.state.boardName} onChange={this.boardNameChange}></Form.Control>
                </FormGroup>
                <Form.Row style = {formRowStyle}>
                    <Button style={ButtonStyle} onClick={this.postBoard}>Create New Board</Button>
                    {this.feedback}
                </Form.Row>
            </Form>);
    }
}

interface RootState {
    userId : number,
    token : string
}

type State = RootState & {
    boardName : string
}
  
const mapStateToProps = (state : any) => {
    return {
        userId : state.idState.userId,
        token : state.loginState.token
    }
};

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        createBoard: (board : BoardType) => {dispatch(createBoard(board))}
    }
}
  
const connector = connect(mapStateToProps, mapDispatchToProps);
  
export default connector(CreateBoardForm);