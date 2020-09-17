import React, {ChangeEvent, FormHTMLAttributes, FormEvent, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import Form, { FormProps } from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { relative } from 'path';
import { render } from '@testing-library/react';
import { register } from '../serviceWorker';
import { FormControlProps } from 'react-bootstrap/esm/FormControl';
import { RequestOptions } from 'https';
import ReactDOM from 'react-dom';
import {connect, ConnectedProps, useDispatch} from 'react-redux';
import { LOGIN, SIGNUP_USER } from '../actions/types';
import { useHistory, useLocation } from 'react-router-dom';
import {login, updateID} from '../actions/loginActions';
import { Dispatch } from 'redux';
import history from './history';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {

}

type State = LoginState & {
    toggleForm : boolean;
    username : string;
    password : string;
    email : string;
    firstName : string;
    lastName : string;
    confirmPass : string;
    isValidated : boolean;
};

class Login extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            toggleForm: true,
            username: "",
            password: "",
            email: "",
            firstName : "",
            lastName: "",
            confirmPass: "",
            isValidated : true,
            userId : 0
            }

        //

        //bind the methods contained within to the class
        this.toggleForm = this.toggleForm.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.confirmPassChange = this.confirmPassChange.bind(this);
    }

    login(event : FormEvent) {
        event.preventDefault();
        console.log("Submitting login...");

        const loginRequestOptions = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password, email: this.state.email})
        } as RequestInit;

        fetch("https://phase2-api.azurewebsites.net/api/User/login", loginRequestOptions)
            .then(async response => {
                if(response.status == 200) {
                    var Id : string = await response.text();
                    this.setState({
                        isAuthenticated: true,
                        userId: parseInt(Id)
                    });
                    this.props.onLogin();
                    this.props.cacheUserId(parseInt(Id));
                    history.push('/home')
                } else {
                    //TODO:// render a login failed message here. Either way, error handling is good
                    console.log("bad login")
                    this.badLoginFeedbackCurrent = (<Form.Control.Feedback type="invalid" style = {this.formFeedbackStyle}>Incorrect username or password!</Form.Control.Feedback>);
                }
            })
            .catch((error) => {
                console.log("Yes, It broke!");
                console.log(error);
                // this.setState({
                //     isAuthenticated: true,
                //     userId: 2
                // });
                this.props.onLogin();
                this.props.cacheUserId(2);
                history.push('/home');
                this.badLoginFeedbackCurrent = (<Form.Control.Feedback type="invalid" style = {this.formFeedbackStyle}>Incorrect username or password!</Form.Control.Feedback>);
            });
    }


    register(event : FormEvent) {
        event.preventDefault();
        console.log("Submitting registration...");

        if(this.state.password != this.state.confirmPass) {
            //TODO: return a failure here in the actual form.
            console.log("passwords don't match");
            return;
        }

        const registerRequestOptions = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName: this.state.firstName, lastName: this.state.lastName, gender: "NA", username: this.state.username, password: this.state.password, email: this.state.email})
        } as RequestInit;

        fetch("https://phase2-api.azurewebsites.net/api/User/signup", registerRequestOptions)
            .then(response => {
                response.headers.forEach(element => {
                    console.log(element);

                    if(response.status == 201) {
                        this.toggleForm();
                    } else {
                        //TODO:// handle the error in here.
                    }
                })
            })
            .catch((error : Error) => {
                console.log(error);
            })
    }

    toggleForm() {
        this.setState({toggleForm: !this.state.toggleForm});
    }


    formFeedbackStyle = {
        position : "relative",
        paddingTop: "0.1vh",
        fontSize: "0.7vw"
    } as React.CSSProperties;
    //The follow methods are used to control the form and perform client-side validation (Just to make sure that client's aren't frustrated when the result isn't what they expect, it's a real-time update for UX)
    usernameChange(event : ChangeEvent<HTMLInputElement>) { 
        this.setState({
            username: event.currentTarget.value
        });

        if(event.currentTarget.value == "") {
            this.userFeedbackCurrent = (<Form.Control.Feedback type="invalid" style = {this.formFeedbackStyle}>You must provide a username!</Form.Control.Feedback>);
        } else {
            this.userFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
        }

        //We need to clear a bad login message if they attempt to change either the username or password.
        this.badLoginFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
    }

    passwordChange(event : ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: event.currentTarget.value
        });

        //TODO: Add in an actual regex to check password expression
        if(event.currentTarget.value == "") {
            this.passFeedbackCurrent = (<Form.Control.Feedback type="invalid" style = {this.formFeedbackStyle}>You must provide a valid password containing at least 6 characters, 1 number and 1 uppercase character!</Form.Control.Feedback>);
        } else {
            this.passFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
        }

        this.badLoginFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
    }

    firstNameChange(event : ChangeEvent<HTMLInputElement>) {
        this.setState({
            firstName: event.currentTarget.value
        });

        if(event.currentTarget.value == "") {
            this.firstFeedbackCurrent = (<Form.Control.Feedback type="invalid" style = {this.formFeedbackStyle}>You must provide a first name!</Form.Control.Feedback>);
        } else {
            this.firstFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
        }
    }

    lastNameChange(event : ChangeEvent<HTMLInputElement>) {
        this.setState({
            lastName: event.currentTarget.value
        });

        if(event.currentTarget.value == "") {
            this.lastFeedbackCurrent = (<Form.Control.Feedback type="invalid" style = {this.formFeedbackStyle}>You must provide a last name!</Form.Control.Feedback>);
        } else {
            this.lastFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
        }
    }

    emailChange(event : ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: event.currentTarget.value
        });

        if(event.currentTarget.value == "") {
            this.emailFeedbackCurrent = (<Form.Control.Feedback type="invalid" style = {this.formFeedbackStyle}>You must provide an email address!</Form.Control.Feedback>);
        } else {
            this.emailFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
        }
    }

    confirmPassChange(event : ChangeEvent<HTMLInputElement>) {
        this.setState({
            confirmPass: event.currentTarget.value
        });

        if(event.currentTarget.value != this.state.password) {
            this.confpassFeedbackCurrent = (<Form.Control.Feedback type="invalid" style = {this.formFeedbackStyle}>Passwords do not match!</Form.Control.Feedback>);
        } else {
            this.confpassFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
        }
    }

    firstFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
    lastFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
    emailFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
    userFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
    passFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
    confpassFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);
    badLoginFeedbackCurrent = (<Form.Control.Feedback></Form.Control.Feedback>);

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

        const loginForm = (   
        <div style={{
            top: "20vh",
            left: "40%",
            width: "20vw",
            position: "relative",
            backgroundColor: "#2C3539"
        }}>
            <img src="https://cdn.auth0.com/blog/react-js/react.png" style={{height: "80%", width: "80%", paddingLeft: "20%"}}></img>
            <Form style={formstyle} noValidate onSubmit={this.login}>
            <Form.Group controlId="Username" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Username:</Form.Label>
                <Form.Control style = {formControlStyle} type="username" placeholder="Username" value={this.state.username} onChange={this.usernameChange}/>
            </Form.Group>
            <Form.Group controlId="Password" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Password:</Form.Label>
                <Form.Control style={formControlStyle} type="password" placeholder="Password" value={this.state.password} onChange={this.passwordChange}/>
                {this.badLoginFeedbackCurrent}
            </Form.Group>
            <Form.Row style = {formRowStyle}>
                <Button id="SubmitForm" style = {ButtonStyle} type = "submit" >Login</Button>
            </Form.Row>
            <Form.Text style = {formTextStyle}>
                Don't have an account? <a href="#" onClick={this.toggleForm}>Sign Up</a>
            </Form.Text>
            </Form>
        </div>);

        const registerForm = (

            <div style={{
                top: "20vh",
                left: "40%",
                width: "20vw",
                height: "70vh",
                position: "relative",
                backgroundColor: "#2C3539"
            }}>
            <Form style={formstyle} noValidate validated={this.state.isValidated} onSubmit={this.register}>
            <Form.Group controlId="Firstname" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>First Name:</Form.Label>
                <Form.Control required style = {formControlStyle} type="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.firstNameChange}/>
                {this.firstFeedbackCurrent}
            </Form.Group>
            <Form.Group controlId="Lastname" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Last Name:</Form.Label>
                <Form.Control required style = {formControlStyle} type="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.lastNameChange}/> 
                {this.lastFeedbackCurrent}              
            </Form.Group>
            <Form.Group controlId="Email" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Email Address:</Form.Label>
                <Form.Control required style = {formControlStyle} type="email" placeholder="Email Address" value={this.state.email} onChange={this.emailChange}/>
                {this.emailFeedbackCurrent}
            </Form.Group>
            <Form.Group controlId="Username" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Username:</Form.Label>
                <Form.Control required style = {formControlStyle} type="username" placeholder="Username" value={this.state.username} onChange={this.usernameChange}/>
                {this.userFeedbackCurrent}
            </Form.Group>
            <Form.Group controlId="Password" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Password:</Form.Label>
                <Form.Control required style={formControlStyle} type="password" placeholder="Password" value={this.state.password} onChange={this.passwordChange}/>
                {this.passFeedbackCurrent}
            </Form.Group>
            <Form.Group controlId="ConfirmPassword" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Confirm Password:</Form.Label>
                <Form.Control required style={formControlStyle} type="password" placeholder="Confirm Password" value={this.state.confirmPass} onChange={this.confirmPassChange}/>
                {this.confpassFeedbackCurrent}
            </Form.Group>
            <Form.Row style = {formRowStyle}>
                <Button id="SubmitForm" style = {ButtonStyle} onClick={this.register}>Register</Button>
            </Form.Row>
            <Form.Text style = {formTextStyle}>
                Already have an account? <a href="#" onClick={this.toggleForm}>Log In</a>
            </Form.Text>
            </Form>
            </div>
        );

        let currentForm;
        if(this.state.toggleForm) {
            currentForm = loginForm;
        } else {
            currentForm = registerForm;
        }

        return (
            <div style={{backgroundColor:"#FF8552"}}>
            {currentForm}
            </div>
        );
    }
}

export interface LoginState {
    isAuthenticated : boolean,
    userId : number
  }
  
  const mapStateToProps = (state : any) => {
    console.log(state)
    console.log(state.isAuthenticated)
    return {
        isAuthenticated : state.loginState.isAuthenticated,
        userId : state.idState.userId
    } as LoginState
  };
  
  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
      onLogin: () => dispatch(login(true)),
      cacheUserId: (id : number) => dispatch(updateID(id))
    }
  }
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  export default connector(Login);
