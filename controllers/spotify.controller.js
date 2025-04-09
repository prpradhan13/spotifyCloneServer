import spotifyApi from "../utils/getAccessToken.js";
import { normalizeAlbums, normalizePopularPlaylists, normalizeSearchTrack, normalizeSeveralArtists, normalizeSingleAlbum, normalizeSingleArtistData, normalizeSingleArtistTracks, normalizeSinglePlaylist, normalizeTrack } from "../utils/normalizeResponseData.js";
import playBack from "../data.json" with { type: "json" };

export const getPopularPlaylists = async (req, res) => {
    try {
        const { playlistIds } = req.body; // Expecting an array of playlist IDs in the request body
        
        if (!Array.isArray(playlistIds) || playlistIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid playlist IDs",
            });
        }

        const playlists = await Promise.all(
            playlistIds.map(async (id) => {
                try {
                    const data = await spotifyApi.getPlaylist(id);
                    return data.body; // Add necessary fields if required
                } catch (err) {
                    console.log(`Error fetching playlist ${id}:`, err.message);
                    return null; // Handle failed requests gracefully
                }
            })
        );

        const filteredPlaylists = playlists.filter((playlist) => playlist !== null);

        const normalizedPlaylists = normalizePopularPlaylists(filteredPlaylists);

        return res.status(200).json({
            success: true,
            popularPlaylists: normalizedPlaylists,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getPopularPlaylists",
        });
    }
};

export const getSinglePlaylists = async (req, res) => {
    try {
        const { playlistId } = req.params;
        
        const data = await spotifyApi.getPlaylist(playlistId);

        const normalizedSinglePlaylists = normalizeSinglePlaylist(data.body)
        
        return res.status(200).json({
            success: true,
            playList: normalizedSinglePlaylists
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getSinglePlaylists"
        })
    }
};

export const getSeveralArtists = async (req, res) => {
    try {
        const { ids } = req.query;

        if (!ids) {
            return res.status(400).json({
                success: false,
                message: "No album IDs provided",
            });
        }

        const artistsIds = ids.split(',');

        if (artistsIds.length > 20) {
            return res.status(400).json({
                success: false,
                message: "You can fetch a maximum of 20 artists at a time",
            });
        }

        const data = await spotifyApi.getArtists(artistsIds);

        const normalizedArtists = normalizeSeveralArtists(data.body.artists)

        return res.status(200).json({
            success: true,
            artists: normalizedArtists
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getSeveralArtists"
        })
    }
};

export const getSingleArtistData = async (req, res) => {
    try {
        const { artistId } = req.params;

        const data = await spotifyApi.getArtist(artistId);

        const normalizedSingleArtist = normalizeSingleArtistData(data.body)

        return res.status(200).json({
            success: true,
            artist: normalizedSingleArtist
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getSingleArtistData"
        })
    }
}

export const getArtistTopTracks = async (req, res) => {
    try {
        const { artistId } = req.params;

        const data = await spotifyApi.getArtistTopTracks(artistId, { country: 'IN' }).then((value) => value)
        
        const normalizedArtistTracks = normalizeSingleArtistTracks(data.body.tracks)

        return res.status(200).json({
            success: true,
            artistTopTracks: normalizedArtistTracks
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getSingleArtists"
        })
    }
};

// Get several albums
export const getSeveralAlbums = async (req, res) => {
    try {
        const { ids } = req.query;

        if (!ids) {
            return res.status(400).json({
                success: false,
                message: "No album IDs provided",
            });
        }

        const albumIds = ids.split(',');

        if (albumIds.length > 20) {
            return res.status(400).json({
                success: false,
                message: "You can fetch a maximum of 20 albums at a time",
            });
        }

        const data = await spotifyApi.getAlbums(albumIds);

        const normalizedAlbums = normalizeAlbums(data.body.albums);

        return res.status(200).json({
            success: true,
            albums: normalizedAlbums,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getSeveralAlbums"
        })
    }
};

export const getSingleAlbum = async (req, res) => {
    try {
        const { albumId } = req.params;

        const data = await spotifyApi.getAlbum(albumId);

        const normalizedSingleAlbum = normalizeSingleAlbum(data.body)
        
        return res.status(200).json({
            success: true,
            playListData: normalizedSingleAlbum
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getSingleAlbum"
        })
    }
};

export const getTrackDetails = async (req, res) => {
    try {
        const { trackId } = req.params;

        const data = await spotifyApi.getTrack(trackId);

        const normalizedTrack = normalizeTrack(data.body);

        const playbackData = playBack.playbackData.filter((elem) => elem.id === normalizedTrack.id);
        
        return res.status(200).json({
            success: true,
            trackDetails: {normalizedTrack, playbackData}
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getTrackDetails"
        })
    }
};

export const getSearch = async (req, res) => {
    try {
        const { query, type = "track", limit = 10 } = req.query; 

        if (!query) {
            return res.status(400).json({
              success: false,
              message: "Query parameter is required",
            });
        }

        const data = await spotifyApi.search(query, [type], {limit})

        const normalizedSearchTracks = normalizeSearchTrack(data.body.tracks.items)

        return res.status(200).json({
            success: true,
            searchData: normalizedSearchTracks,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getSearch"
        })
    }
};
