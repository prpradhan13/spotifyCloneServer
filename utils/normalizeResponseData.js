
// Normalize albums data
export const normalizeAlbums = (albums) => {
    return albums.map(album => ({
      id: album.id,
      name: album.name,
      imageUrl: album.images?.[0]?.url || '',
      type: album.type,
      artist: album.artists?.map(artist => artist.name).join(", ") || "Unknown Artist"
    }));
};

export const normalizeSingleAlbum = (album) => {
  return {
    id: album.id,
    name: album.name,
    imageUrl: album.images?.[0]?.url || '',
    type: album.type,
    releaseDate: album.release_date,
    artist: album.artists,
    tracks: album.tracks.items
  };
};

export const normalizePopularPlaylists = (playLists) => {
    return playLists.map(playList => ({
      id: playList.id,
      name: playList.name,
      imageUrl: playList.images?.[0]?.url || '',
      type: playList.type,
      playListOwnerName: playList.owner.display_name || "Unknown Owner",
    }));
};

export const normalizeSinglePlaylist = (playList) => {
    return {
      id: playList.id,
      name: playList.name,
      imageUrl: playList.images?.[0]?.url || '',
      type: playList.type,
      playListOwnerName: playList.owner.display_name || "Unknown Owner",
      tracks: playList.tracks.items
    };
};

export const normalizeSeveralArtists = (artists) => {
  return artists.map(artist => ({
    id: artist.id,
    artistName: artist.name,
    imageUrl: artist.images?.[0]?.url || '',
    type: artist.type,
  }));
}

export const normalizeSingleArtistTracks = (tracks) => {
  return tracks.map(track => ({
    id: track.id,
    trackName: track.name,
    imageUrl: track.album.images?.[0]?.url || '',
    artists: track.artists?.map(artist => artist.name)
  }));
};

export const normalizeSingleArtistData = (artist) => {
  return {
    id: artist.id,
    imageUrl: artist.images?.[0]?.url || '',
    name: artist.name
  }
};

export const normalizeTrack = (track) => {
  return {
    id: track.id,
    trackName: track.name,
    artists: track.artists,
    imageUrl: track.album.images?.[0]?.url || '',
  }
}