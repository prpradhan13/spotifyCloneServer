
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

export const normalizePopularPlaylists = (playLists) => {
    return playLists.map(playList => ({
      id: playList.id,
      name: playList.name,
      imageUrl: playList.images?.[0]?.url || '',
      type: playList.type,
      playListOwnerName: playList.owner.display_name || "Unknown Owner",
    }));
};

export const normalizeSeveralArtists = (artists) => {
  return artists.map(artist => ({
    id: artist.id,
    artistName: artist.name,
    imageUrl: artist.images?.[0]?.url || '',
    type: artist.type,
  }));
}

// export const normalizeSingleAlbum = (albums) => {
//     return albums.map(album => ({
//       id: album.id,
//       name: album.name,
//       imageUrl: album.images,
//       type: album.type,
//       releaseDate: album.release_date,
//       artist: album.artists,
//       tracks: album.tracks
//     }));
// };