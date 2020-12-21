import React, { useEffect, useState } from "react";
import "./App.css";
import queryString from "query-string";

function App() {
  let parsed = queryString.parse(window.location.search);
  let accessToken = parsed.access_token;

  const [playlists, setPlaylists] = useState([{}]);
  const [user, setUser] = useState([{}]);
  const [owner, setOwner] = useState({});

  useEffect(() => {
    getUser()
    getPlaylists()
  }, []);

  const getUser = async () => {
    await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken },
    }).then((response) => response.json())
      .then((data) => {
        setUser(data);
        }
      );
  }
  
  const getPlaylists = async() => {
    await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken },
    }).then((response) => response.json())
      .then((playlistsData) => {
        console.log(playlistsData.items);
        setPlaylists(playlistsData.items);
        setOwner(playlistsData.owner);
        savePlaylist(playlistsData.items)
      });
  }

  const savePlaylist = (playlists) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
  };
  if(playlists.length > 0){  playlists.map((playlist) => {
    console.log(playlist);
    return fetch("http://localhost:8888/playlists", 
    requestOptions,{
      name:'playlist',
      description: 'hello',
      owner: 'Hello',
      image:'image'
    }
  ).then((response) => response.json())
    .then((data) => {
      console.log("Playlist enregistrée");
      }
    );
  })}
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Bonjour {user.display_name}!</h1>    
        {playlists ? (
          playlists.map((playlist, index) => (
            <p className="playlist" key={index}>
              Playlist : {playlist.name} Description : {playlist.description}
               {/* Owner: {owner} */}
            </p>
          ))
        ) : (
          <a className="login" href='http://localhost:8888/login'>Se connecter</a>
        )}
      </header>
    </div>
  );
}

export default App;
