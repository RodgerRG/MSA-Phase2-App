import React, { ReactPropTypes, Component, FormEvent, ChangeEvent } from 'react';
import Login from './Login';
import { Provider, connect, useDispatch, ConnectedProps } from 'react-redux';
import {Redirect, Router, Route, Switch} from 'react-router-dom';
import { Store, AnyAction, createStore, Dispatch } from 'redux';
import App from './App';
import { LOGIN, SIGNUP_USER, BoardType, JobPost } from '../actions/types';
import {login} from '../actions/loginActions';
import history from './history';
import Dashboard from './JobBoard';
import { Form, Button } from 'react-bootstrap';
import { renderPosting } from '../actions/postingActions';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  
}

class CreateJobForm extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {
            userId : props.userId,
            board : props.board,
            token : "",
            title : "",
            description : ""
        };

        this.postJob = this.postJob.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
    }

    postJob(event : FormEvent) {
        event.preventDefault();

        const jobRequestOptions = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Authorization" : "Bearer " + this.props.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({posterId : this.props.userId, boardId: this.props.board.boardId, description : this.state.description, title : this.state.title})
        } as RequestInit;

        console.log(jobRequestOptions.body);

        fetch("https://phase2-api.azurewebsites.net/api/Jobs", jobRequestOptions)
            .then(async response => {
                if(response.status == 201) {
                    var job : JobPost = await response.json();
                    console.log(job);
                    this.props.addJob(job);
                } else {
                    console.log("bad post")
                }
                
            }).catch(error => {
                this.props.addJob({
                    Poster: "Rodger",
                    IsTaken: false,
                    Description: "sdfsadfds",
                    Thumbnail: "",
                    Location: "",
                    Title: "sfsdaf"
                })
            });
    }

    titleChange(event : ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState({
            title : event.currentTarget.value
        })
    }

    descriptionChange(event : ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState({
            description : event.currentTarget.value
        })
    }

    render() {
        const formstyle =  {
            color: "#CDCEBE",
            padding: "1vw",
            fontFamily: "Arial",
            alignContent: "center",
        } as React.CSSProperties;
    
        const formGroupStyle = {
            alignItems: "center",
            position: "relative",
            textAlign : 'center'
        } as React.CSSProperties;
    
        const formLabelStyle = {
            fontSize: "1vw",
            color : '#2C3539',
            fontFamily : 'Arial'
        } as React.CSSProperties;
    
        const formControlStyle = {
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
            fontFamily: "Arial"
        } as React.CSSProperties;

        return(
            <Form style={formstyle}>
                <Form.Group controlId="Title" style = {formGroupStyle}>
                    <Form.Label style = {formLabelStyle}>Title:</Form.Label>
                    <Form.Control required style = {formControlStyle} placeholder="Title" value={this.state.title} onChange={this.titleChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="Description" style = {formGroupStyle}>
                    <Form.Label style = {formLabelStyle}>Description:</Form.Label>
                    <Form.Control required as="textarea" style = {formControlStyle} placeholder="Description" value={this.state.description} onChange={this.descriptionChange}></Form.Control>
                </Form.Group>
                <Form.Row style = {formRowStyle}>
                    <Button style={ButtonStyle} onClick={this.postJob}>Post New Job</Button>
                </Form.Row>
            </Form>);
    }
}

interface RootState {
    userId : number,
    board : BoardType,
    token : string
}

type State = RootState & {
    title : string,
    description : string
}
  
const mapStateToProps = (state : any) => { 
    console.log(state);
    return{
        userId : state.idState.userId,
        board : state.postBoardState.board,
        token : state.loginState.token
    }
};

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        addJob: (job : JobPost) => dispatch(renderPosting(job))
    }
}
  
const connector = connect(mapStateToProps, mapDispatchToProps);
  
export default connector(CreateJobForm);