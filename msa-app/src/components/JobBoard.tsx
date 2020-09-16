import React, { CSSProperties } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { Dispatch } from 'redux';
import { HubConnectionBuilder, LogLevel, HubConnection} from '@microsoft/signalr';
import { parentPort } from 'worker_threads';
import { renderPosting } from '../actions/postingActions';
import JobPosting from './JobPosting';
import TopNav from './TopNav';
import { Col } from 'react-bootstrap';
import SideNav from './SideNav';


type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {

}

type BoardReturn = {
    boardId : number,
    postings : JobPost[]
}

export type JobPost = {
    Poster : string,
    IsTaken : boolean,
    Description : string,
    Thumbnail : string,
    Location : string,
    Title : string
}

class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hubConnection : null,
            board : props.board
        }

        this.createHubConnection = this.createHubConnection.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    componentDidMount() {
      // this.createHubConnection();
    }

    createBoard() {
        const boardRequestOptions = {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({boardID : this.state.board})
        } as RequestInit;

        fetch("https://phase2-api.azurewebsites.net/api/Boards", boardRequestOptions)
            .then(async response => {
                if(response.status == 200) {
                    if(response.bodyUsed) {
                        var body : BoardReturn = await response.json();
                        return body.postings.map(this.createPost);
                    }
                } else {
                    
                    
                }
            })
            .catch((error) => {
                
            });
    }

    createPost(posting : JobPost) {
        return (<JobPosting {...posting}/>);
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
            left: '-0.8vw'
        } as CSSProperties;

        return (
            <div style={baseStyle}>
                <TopNav />
                <Col xs={3} style={navStyle}>
                    <SideNav/>
                </Col>
                {this.createBoard}
            </div>
        );
    }
}

interface RootState {
    board : number,
}

type State = RootState & {
    hubConnection : HubConnection | null,
}
  
const mapStateToProps = (state : RootState) => ({
    board : state.board,
});

const mapDispatchToProps = (dispatch : Dispatch) => {
    return {
        renderPosting: (posting : JobPost) => dispatch(renderPosting(posting))
    }
}
  
const connector = connect(mapStateToProps, mapDispatchToProps);
  
export default connector(Dashboard);