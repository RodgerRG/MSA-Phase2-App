import React, { CSSProperties, MouseEvent } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { Dispatch } from 'redux';
import { HubConnectionBuilder, LogLevel, HubConnection} from '@microsoft/signalr';
import { parentPort } from 'worker_threads';
import { renderPosting } from '../actions/postingActions';
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
        homeColor : '#BF94E4',
        boardColor : '#BF94E4'
    }

    this.hoverLightHome = this.hoverLightHome.bind(this);
    this.hoverDarkHome = this.hoverDarkHome.bind(this);
    this.hoverLightBoard = this.hoverLightBoard.bind(this);
    this.hoverDarkBoard = this.hoverDarkBoard.bind(this);
  }

  //Cut me a break here, there's no such thing as :hover for React =.=*
  hoverLightHome(event : MouseEvent) {
    event.preventDefault();
    this.setState({
        homeColor: '#EFDFFF'
    })
  }

  hoverDarkHome(event : MouseEvent) {
    event.preventDefault();
    this.setState({
        homeColor: '#BF94E4'
    })
  }

  hoverLightBoard(event : MouseEvent) {
    event.preventDefault();
    this.setState({
        boardColor: '#EFDFFF'
    })
  }

  hoverDarkBoard(event : MouseEvent) {
    event.preventDefault();
    this.setState({
        boardColor: '#BF94E4'
    })
  }

  render() {
    const baseStyle = {
        backgroundColor: '#2C3539',
        variant: 'dark',
        height: '4.5vh'
    } as CSSProperties;

    const rowStyle = {
        position: 'relative',
        fontSize: '1.5vh',
        fontFamily: 'Comic Sans MS',
        paddingRight: '1vw',
        textDecoration: 'none',
    } as CSSProperties;

    const imageStyle = {
        height: '4vh',
        width: '4vh',
    } as CSSProperties;

    const homeStyle = {
        backgroundColor: '#2C3539',
        color: this.state.homeColor,
        fontStyle: 'normal',
        textDecoration: 'none'
    } as CSSProperties;

    const boardsStyle = {
        backgroundColor: '#2C3539',
        color: this.state.boardColor,
        fontStyle: 'normal',
        textDecoration: 'none'
    } as CSSProperties;

    return(
        <Navbar style = {baseStyle}>
            <Navbar.Brand>
                <img src="https://cdn.auth0.com/blog/react-js/react.png" style={imageStyle}></img>
            </Navbar.Brand>
            <Nav.Link style={rowStyle} onMouseEnter={this.hoverLightHome} onMouseLeave={this.hoverDarkHome}>
                <Link to="/home" style={homeStyle}>Home</Link>
            </Nav.Link>
            <Nav.Link style={rowStyle} onMouseEnter={this.hoverLightBoard} onMouseLeave={this.hoverDarkBoard}>
                <Link to="/boards" style={boardsStyle}>Boards</Link>
            </Nav.Link>
        </Navbar>
    );
  }

}

interface RootState {

}

type State = RootState & {
    homeColor : string,
    boardColor : string
}

const mapStateToProps = (state : RootState) => ({

});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return {
    
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(App);
