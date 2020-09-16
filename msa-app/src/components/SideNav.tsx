import React, { ReactPropTypes, Component, CSSProperties } from 'react';
import Login from './Login';
import { Provider, connect, useDispatch, ConnectedProps } from 'react-redux';
import {Redirect, Router, Route, Switch} from 'react-router-dom';
import { Store, AnyAction, createStore, Dispatch } from 'redux';
import App from './App';
import { LOGIN, SIGNUP_USER } from '../actions/types';
import {login} from '../actions/loginActions';
import history from './history';
import Dashboard from './JobBoard';
import { Nav, Accordion, Card } from 'react-bootstrap';
import CreateBoardForm from './CreateBoardForm';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  
}

class SideNav extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    render() {
        const baseStyle = {
            position: 'relative',
            backgroundColor: '#2C3539',
            height: '89.8vh'
        } as CSSProperties;

        const accordionHeaderStyle = {
            backgroundColor : '#FF8552',
            alignContent : 'center',
            fontSize: '2.5vh',
            fontFamily: 'Comic Sans MS',
            color: '#2C3539'
        } as CSSProperties;

        const accordionCollapseStyle = {
            backgroundColor : '#CDCEBE'
        } as CSSProperties;

        return(
            <div style={baseStyle}>
            <Accordion defaultActiveKey="1">
                <Card>
                    <Accordion.Toggle eventKey = "0" as={Card.Header} style={accordionHeaderStyle}>
                        Boards
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey = "0" style={accordionCollapseStyle}>
                        <Card.Body>
                            <Card.Title>
                                Tester
                            </Card.Title>
                            <Card.Text>
                                Lorem Ipsum Dolor Est.
                            </Card.Text>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle eventKey = "1" as={Card.Header} style={accordionHeaderStyle}>
                        Create Board
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey = "1" style={accordionCollapseStyle}>
                        <CreateBoardForm />
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle eventKey = "2" as={Card.Header} style={accordionHeaderStyle}>
                        Create Job
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey = "2" style={accordionCollapseStyle}>
                        <Card.Body>
                            <Card.Title>
                                Tester
                            </Card.Title>
                            <Card.Text>
                                Lorem Ipsum Dolor Est.
                            </Card.Text>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            </div>
        );
    }
}

interface RootState {
    
}

type State = RootState & {
    
}
  
const mapStateToProps = (state : RootState) => ({
    
});

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        
    }
}
  
const connector = connect(mapStateToProps, mapDispatchToProps);
  
export default connector(SideNav);