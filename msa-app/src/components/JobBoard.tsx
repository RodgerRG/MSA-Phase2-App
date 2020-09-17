import React, { CSSProperties, MouseEvent } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { Dispatch } from 'redux';
import { HubConnectionBuilder, LogLevel, HubConnection} from '@microsoft/signalr';
import { parentPort } from 'worker_threads';
import { createBoard, renderPosting } from '../actions/postingActions';
import TopNav from './TopNav';
import { Button, Card, CardColumns, Col, Row } from 'react-bootstrap';
import SideNav from './SideNav';
import { BoardType, JobPost } from '../actions/types';
import { FacebookShareButton, FacebookIcon } from 'react-share';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {

}

type BoardReturn = {
    boardId : number,
    postings : JobPost[]
}

class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hubConnection : null,
            board : 0,
            boardActual : props.boardActual,
            token : "",
            postings : []
        }

        this.createHubConnection = this.createHubConnection.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.removeJob = this.removeJob.bind(this);
    }

    componentDidMount() {
      // this.createHubConnection();
    }

    componentDidUpdate(prevProps : Props) {
        console.log("a component updated")
        if(prevProps.board != this.props.board || prevProps.boardActual != this.props.boardActual) {
            console.log("creating new board")
            this.createBoard();
        }
    }

    createBoard() {
        const boardRequestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Authorization" : "Bearer " + this.props.token
            }
        } as RequestInit;

        fetch("https://phase2-api.azurewebsites.net/api/Boards/" + this.props.board, boardRequestOptions)
            .then(async response => {
                if(response.status == 200) {
                    var body = await response.json();
                    console.log(body);
                    this.setState({ 
                        postings : body.jobs.map(this.createPost)
                    });
                } else {
                    
                    
                }
            })
            .catch((error) => {
                
            });
    }

    removeJob(event : MouseEvent) {
        event.preventDefault();
        let jobId = event.currentTarget.attributes.getNamedItem('key')?.textContent; 
    }

    createPost(posting : any) {
        console.log(posting);
        console.log(posting.isTaken);
        var colour;
        var button;

        const buttonElement = (<Button>Take Job</Button>)
        const noMoreJobElement = (<footer>Job Taken!</footer>);

        if(posting.isTaken) {
            colour = "danger";
            button = noMoreJobElement;
        } else {
            colour = "success";
            button = buttonElement;
        }

        const shareButton = (<FacebookShareButton
            url={"https://phase2-app.azurewebsites.net/boards"}
            quote={posting.title}
            hashtag="#MSA-Phase2"
            >
                <FacebookIcon size={"5vh"} />
        </FacebookShareButton>);

        const facebookButtonStyle = {
            right: "-10vw"
        } as CSSProperties;

        let element = (<Card border={colour} key={posting.jobId}>
                    <Card.Body>
                        <Card.Title>{posting.title}</Card.Title>
                        <Card.Subtitle>{posting.poster}</Card.Subtitle>
                        <Card.Text>{posting.description}</Card.Text>
                        <Row>
                            <Col xs={4}>
                                {button}
                            </Col>
                            <Col xs={4} style={facebookButtonStyle}>
                                {shareButton}
                            </Col>
                        </Row>
                        
                    </Card.Body>
                </Card>);

        console.log(element);

        return element;
    }

    async createHubConnection() {
        const connection = new HubConnectionBuilder()
                .withUrl("https://phase2-api.azurewebsites.net/hub")
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();
            
        try {
            await connection.start();       
            console.log("Connection Successful");
        } catch(error) {
            console.log("Error establishing connection");
        }

        this.setState({
            hubConnection : connection
        })
    }

    render() {
        const baseStyle = {
        } as CSSProperties;

        const navStyle = {
        } as CSSProperties;

        const rowStyle = {
            left: '-0.5vw',
            width: '100vw'
        } as CSSProperties;

        const dashStyle = {
        } as CSSProperties;

        return (
            <div style={baseStyle}>
                <TopNav />
                    <Row style={rowStyle}>
                    <Col xs={3} style={navStyle}>
                        <SideNav/>
                    </Col>
                    <Col xs={9} style={dashStyle}>
                        <CardColumns>
                            {this.state.postings}
                        </CardColumns>
                    </Col>
                    </Row>
            </div>
        );
    }
}

interface RootState {
    token : string,
    board : number,
    boardActual : BoardType
}

type State = RootState & {
    hubConnection : HubConnection | null,
    postings : JSX.Element[]
}
  
const mapStateToProps = (state : any) => {
    return {
        board : state.postBoardState.board.boardId,
        boardActual : state.postBoardState.board,
        token : state.loginState.token
    }
};

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        createBoard: (board : BoardType) => {dispatch(createBoard(board))}
    }
}
  
const connector = connect(mapStateToProps, mapDispatchToProps);
  
export default connector(Dashboard);