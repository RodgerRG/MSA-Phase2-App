import React, { ChangeEvent, CSSProperties, MouseEvent } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { Dispatch } from 'redux';
import { HubConnectionBuilder, LogLevel, HubConnection} from '@microsoft/signalr';
import { parentPort } from 'worker_threads';
import { renderPosting } from '../actions/postingActions';
import JobPosting from './JobPosting';
import TopNav from './TopNav';
import { Col, ListGroup, Row, Tab } from 'react-bootstrap';
import { BoardListType, BoardType } from '../actions/types';
import { JsxElement } from 'typescript';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {

}

class BoardsList extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    this.state = {
        boards : [],
        board : props.board,
        token : ""
    }

    this.populateBuildList = this.populateBuildList.bind(this)
    this.createListItem = this.createListItem.bind(this)
    this.selectBoard = this.selectBoard.bind(this)
  }

  componentDidMount() {
      this.populateBuildList();
  }

  componentDidUpdate() {
      this.populateBuildList();
  }

  populateBuildList() {
      const boardRequestOptions = {
          method: "GET",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Authorization" : "Bearer " + this.props.token
          }
      } as RequestInit;

      fetch("https://phase2-api.azurewebsites.net/api/Boards", boardRequestOptions)
        .then(async response => {
            if(response.status == 200) {
                var body : BoardListType[] = await response.json();
                this.setState({
                    boards : body.map(this.createListItem)
                });
            } else {
                console.log("bad post");
                console.log(response.status);
            }
        }).catch(error => {
            console.log("something broke")
        });
  }

  createListItem(boardListItem : BoardListType) {
    const ref = "" + boardListItem.boardId;

    return (
        <ListGroup.Item action href={ref} onClick={this.selectBoard} key={boardListItem.boardId}>
            {boardListItem.boardName}
        </ListGroup.Item>
    )
  }

  selectBoard(event : MouseEvent) {
    event.preventDefault();

    

    console.log(event.currentTarget.attributes.getNamedItem('href')?.textContent);
    console.log(event.currentTarget.textContent);
  }

  render() {
    return(
        <Tab.Container id="list-group-tabs-example">
            <ListGroup>
                {this.state.boards}
            </ListGroup>
        </Tab.Container>
    );
  }

}

interface RootState {
    token : string
}

type State = RootState & {
    boards : JSX.Element[],
    board : BoardType
}

const mapStateToProps = (state : any) => ({
    token : state.loginState.token,
    board : state.postBoardState
});

const mapDispatchToProps = (dispatch : Dispatch) => {
  return {
    
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(BoardsList);
