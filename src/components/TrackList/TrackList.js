import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render(){
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return <Track 
                    key={track.id} 
                    trackName={track.name} 
                    artistName={track.artist} 
                    albumName={track.album}
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                  />
        })}
      </div>
    );
  }
}

export default TrackList;
