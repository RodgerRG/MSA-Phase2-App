import React, { CSSProperties } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import { Dispatch } from 'redux';
import { stringify } from 'querystring';
import { stat } from 'fs';
import { renderPosting } from '../actions/postingActions';


type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
    Poster : string,
    IsTaken : boolean,
    Description : string,
    Thumbnail : string,
    Location : string,
    Title : string
}


class JobPosting extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            Poster : props.Poster,
            IsTaken : props.IsTaken,
            Description : props.Description,
            Thumbnail : props.Thumbnail,
            Location : props.Location,
            Title : props.Title
        }
        //bind the methods in here, there shouldn't be very many if any.
    }


    render() {
        const baseStyle = {
            position : "relative",
            borderColor : "",
            borderWidth : "0.1vw"

        } as CSSProperties;

        const titleStyle = {

        } as CSSProperties;

        const posterStyle = {

        } as CSSProperties;

        const thumbnailStyle = {

        } as CSSProperties;

        const descriptionStyle = {

        } as CSSProperties;

        const buttonStyle = {

        } as CSSProperties;

        const takenTextStyle = {

        } as CSSProperties;

        const takeJob = (
            <button style={buttonStyle}>Accept</button>
        );

        const jobTaken = (
            <h3 style={takenTextStyle}>Job Taken!</h3>
        );

        let JobStatus;
        if(this.state.IsTaken) {
            JobStatus = jobTaken;
        } else {
            JobStatus = takeJob;
        }

        return (
            <div style={baseStyle}>
                <h1 style={titleStyle}>{this.state.Title}</h1>
                <h2 style={posterStyle}>{this.state.Poster}</h2>
                <img src = {this.state.Thumbnail} style = {thumbnailStyle}></img>
                <p style={descriptionStyle}>{this.state.Description}</p>
                <div>
                    {JobStatus}
                </div>
            </div>
        );
    }
}

interface RootState {
    
}

type State = RootState & {
    Poster : string,
    IsTaken : boolean,
    Description : string,
    Thumbnail : string,
    Location : string,
    Title : string
}
  
const mapStateToProps = (state : RootState) => ({
    
});

const mapDispatchToProps = (dispatch : Dispatch) => {
    
}
  
const connector = connect(mapStateToProps);
  
export default connector(JobPosting);