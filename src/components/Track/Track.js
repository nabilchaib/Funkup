import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.trackName}</h3>
          <p>{this.props.artistName} | {this.props.albumName}</p>
        </div>
        <button 
          className="Track-action" 
          onClick={this.addTrack}
        >
          +
        </button>
        <button 
          className="Track-action" 
          onClick={this.removeTrack}
        >
          -
        </button>
      </div>
    );
  }
}

export default Track;
