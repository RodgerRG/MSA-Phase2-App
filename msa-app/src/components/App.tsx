import React, { CSSProperties } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { Dispatch } from 'redux';
import { HubConnectionBuilder, LogLevel, HubConnection} from '@microsoft/signalr';
import { parentPort } from 'worker_threads';
import { renderPosting } from '../actions/postingActions';
import JobPosting from './JobPosting';
import TopNav from './TopNav';

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {

}

class App extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);
  }

  render() {
    return(
      <div>
        <TopNav />
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

export default connector(App);
