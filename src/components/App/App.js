import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: 'Song 1', artist: 'Artist 1', album: 'Album 1', id: 1 },
        { name: 'Song 2', artist: 'Artist 2', album: 'Album 2', id: 2 },
        { name: 'Song 3', artist: 'Artist 3', album: 'Album 3', id: 3 },
      ],
      playlistName: '',
      playlistTracks: [
        { name : 'Song 1', artist: 'Artist 1', album: 'Album 1', id: 1 },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      return; 
    }
    const updatedPlaylist = [...this.state.playlistTracks, track];
    this.setState({ playlistTracks: updatedPlaylist });
  }
  
  removeTrack(track) {
    const updatedPlaylist = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({ playlistTracks: updatedPlaylist });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name });
  }
  
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    const playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackURIs)
      .then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      });
  }


  search(term) {
    Spotify.search(term)
      .then(searchResults => {
        this.setState({ searchResults: searchResults });
      });
  }

  
  
  render(){
    return (
      <div>
        <h1>Fun<span className="highlight">nnk</span>up</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
