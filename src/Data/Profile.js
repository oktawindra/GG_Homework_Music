import axios from "axios";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export const searchTrack = async (query, accessToken) => {
  const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.get(`${SPOTIFY_BASE_URL}/search?type=track&q=${query}`, requestOptions);

  return response.data;
}

export const getUserProfile = async (accessToken) => {
  const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.get(`${SPOTIFY_BASE_URL}/me`, requestOptions);

  return response.data;
}

export const createPlaylist = async (accessToken, userId, { name, description }) => {
  const data = JSON.stringify({
    name,
    description,
    public: false,
    collaborative: false,
  })

  const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(
    `${SPOTIFY_BASE_URL}/users/${userId}/playlists`,
    data,
    requestOptions
  );

  return response.data;
}

export const addTracksToPlaylist = async (accessToken, playlistId, uris) => {
  const data = JSON.stringify({
    uris
  });

  const requestOptions = {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(
    `${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
    data,
    requestOptions
  );

  return response.data;
}