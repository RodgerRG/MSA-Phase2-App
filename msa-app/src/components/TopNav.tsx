import React, { CSSProperties, MouseEvent } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { Dispatch } from 'redux';
import { HubConnectionBuilder, LogLevel, HubConnection} from '@microsoft/signalr';
import { parentPort } from 'worker_threads';
import { renderPosting } from '../actions/postingActions';
import JobPosting from './JobPosting';
import {Row, Navbar, Nav} from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Link } from 'react-router-dom';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {

}

//Scaffold out the code for connecting it to redux, just in case >.>
class App extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);
    this.state = {
        headerColor : '#BF94E4'
    }

    this.hoverLight = this.hoverLight.bind(this);
    this.hoverDark = this.hoverDark.bind(this);
  }

  hoverLight(event : MouseEvent) {
    event.preventDefault();
    this.setState({
        headerColor: '#EFDFFF'
    })
  }

  hoverDark(event : MouseEvent) {
    event.preventDefault();
    this.setState({
        headerColor: '#BF94E4'
    })
  }

  render() {
    const baseStyle = {
        backgroundColor: '#2C3539',
        variant: 'dark'
    } as CSSProperties;

    const rowStyle = {
        position: 'relative',
        borderWidth: '0.1vw',
        fontSize: '2vw',
        fontFamily: 'MS Comic Sans',
        paddingRight: '1vw',
        top: '-3.5vh',
        textDecoration: 'none'
    } as CSSProperties;

    const homeStyle = {
        height: '4vw',
        width: '4vw',
        padding: '1vh'
    } as CSSProperties;

    const textStyle = {
        backgroundColor: '#2C3539',
        color: this.state.headerColor,
        fontStyle: 'normal',
        textDecoration: 'none'
    } as CSSProperties;

    return(
        <Navbar style = {baseStyle}>
            <Navbar.Brand>
                <img src="https://cdn.auth0.com/blog/react-js/react.png" style={homeStyle}></img>
            </Navbar.Brand>
            <Nav.Link style={rowStyle} onMouseEnter={this.hoverLight} onMouseLeave={this.hoverDark}>
                <Link to="/home" style={textStyle}>Home</Link>
            </Nav.Link>
            <Nav.Link style={rowStyle}>
                <Link to="/boards" style={textStyle}>Boards</Link>
            </Nav.Link>
        </Navbar>
    );
  }

}

interface RootState {

}

type State = RootState & {
    headerColor : string
}

const mapStateToProps = (state : RootState) => ({

});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return {
    
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(App);
