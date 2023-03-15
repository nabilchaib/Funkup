const clientId = 'c6e09b0c9b12483eb2102710103ce590';
const redirectUri = 'http://localhost:3000/';


const Spotify = {
    accessToken: '',
  
    getAccessToken() {
      if (this.accessToken) {
        return this.accessToken;
      }
  
      // Check if the access token is in the URL
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  
      if (accessTokenMatch && expiresInMatch) {
        this.accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
  
        // Clear the parameters from the URL, so the app doesn't try grabbing the token after it has expired
        window.setTimeout(() => this.accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
  
        return this.accessToken;
      } else {
        const scope = 'user-read-private user-read-email';
        const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}&show_dialog=true`;
  
        window.location = url;
      }
    },

    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
        return;
        }
        const accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        const response = await fetch('https://api.spotify.com/v1/me', { headers: headers }
        );
        const jsonResponse = await response.json();
        userId = jsonResponse.id;

        const response_1 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name: playlistName })
        });

        const jsonResponse_1 = await response_1.json();
        const playlistId = jsonResponse_1.id;

        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ uris: trackURIs })
        });
        },

    search(term) {
        const accessToken = this.getAccessToken();
        const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    
        return fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          if (!jsonResponse.tracks) {
            return [];
          }
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }));
        });
    }
      
  
    // Other methods
  };
  
  export default Spotify;
  