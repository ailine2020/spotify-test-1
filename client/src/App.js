import React, { useEffect, useState } from "react";
import "./App.css";
import queryString from "query-string";

function App() {
  let parsed = queryString.parse(window.location.search);
  let accessToken = parsed.access_token;
  const [playlists, setPlaylists] = useState([{}]);
  const [user, setUser] = useState([{}]);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        console.log('user', data);     
        }
      );

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((playlistsData) => {
        setPlaylists(playlistsData.items);
        console.log("-----", playlists);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {<h1 className="title">Bonjour {user.display_name}!</h1>}      
        {playlists ? (
          playlists.map((playlist, index) => (
            <p className="playlist" key={index}>
              {/* <img src={playlist.images} style={{ width: "60px" }} /> */}
              Playlist : {playlist.name} Description : {playlist.description}
            </p>
          ))
        ) : (
          <a className="login" href="http://localhost:8888/login">Se connecter</a>
        )}
      </header>
    </div>
  );
}

export default App;
