import React, {ChangeEvent, FormHTMLAttributes} from 'react';
import ReactMarkdown from 'react-markdown';
import Form, { FormProps } from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { relative } from 'path';
import { render } from '@testing-library/react';
import { register } from './serviceWorker';
import { FormControlProps } from 'react-bootstrap/esm/FormControl';

type Props = {

};

type State = {
    toggleForm : boolean;
    username : string;
    password : string;
    email : string;
};

class Login extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            toggleForm: true,
            username: "",
            password: "",
            email: ""
            }

        //

        //bind the methods contained within to the class
        this.toggleForm = this.toggleForm.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    login() {
        console.log("Submitting login...");
    }

    register() {

    }

    toggleForm() {
        this.setState({toggleForm: !this.state.toggleForm});
    }

    usernameChange(event : ChangeEvent<HTMLInputElement>) { 
        this.setState({
            username: event.currentTarget.value
        });
    }

    passwordChange(event : ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: event.currentTarget.value
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
            paddingLeft: "14%",
            paddingTop: "2vh",
            alignItems: "center",
            position: "relative",
        } as React.CSSProperties;
    
        const formLabelStyle = {
            fontSize: "1vw",
            paddingBottom: ".5vh",
        } as React.CSSProperties;
    
        const formControlStyle = {
            width: "80%",
            fontSize: "1vw",
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
            fontSize: "0.7vw"
        } as React.CSSProperties;

        const loginForm = (   
        <div style={{
            top: "20vh",
            left: "40%",
            width: "20vw",
            position: "relative",
            backgroundColor: "#2C3539"
        }}>
            <img src="https://cdn.auth0.com/blog/react-js/react.png" style={{height: "80%", width: "80%", padding: "10%"}}></img>
            <Form style={formstyle} onSubmit={this.login}>
            <Form.Group controlId="Username" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Username:</Form.Label>
                <Form.Control style = {formControlStyle} type="username" placeholder="Username" value={this.state.username} onChange={this.usernameChange}/>
            </Form.Group>
            <Form.Group controlId="Password" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Password:</Form.Label>
                <Form.Control style={formControlStyle} type="password" placeholder="Password" value={this.state.password} onChange={this.passwordChange}/>
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
                height: "60vh",
                position: "relative",
                backgroundColor: "#2C3539"
            }}>
            <Form style={formstyle}>
            <Form.Group controlId="Firstname" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>First Name:</Form.Label>
                <Form.Control style = {formControlStyle} type="firstName" placeholder="First Name" />
            </Form.Group>
            <Form.Group controlId="Lastname" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Last Name:</Form.Label>
                <Form.Control style = {formControlStyle} type="lastName" placeholder="Last Name" />
            </Form.Group>
            <Form.Group controlId="Email" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Email Address:</Form.Label>
                <Form.Control style = {formControlStyle} type="email" placeholder="Email Address" />
            </Form.Group>
            <Form.Group controlId="Username" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Username:</Form.Label>
                <Form.Control style = {formControlStyle} type="username" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="Password" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Password:</Form.Label>
                <Form.Control style={formControlStyle} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="ConfirmPassword" style = {formGroupStyle}>
                <Form.Label style = {formLabelStyle}>Confirm Password:</Form.Label>
                <Form.Control style={formControlStyle} type="confirm-password" placeholder="Confirm Password" />
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

export default Login;
