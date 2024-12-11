import express from 'express';
import { getSingleAlbum, getSinglePlaylists, getSeveralAlbums, getPopularPlaylists, getSeveralArtists, getArtistTopTracks, getSingleArtistData, getTrackDetails, getSearch } from '../controllers/spotify.controller.js';

const router = express.Router();

router.post("/popular-playlists", getPopularPlaylists);

router.get("/playlists/:playlistId", getSinglePlaylists);

// Get several artists
router.get("/artists", getSeveralArtists);

// Get Single Artist Data
router.get("/artists/:artistId", getSingleArtistData);

// Get Artist Top Tracks
router.get("/artists/:artistId/top-tracks", getArtistTopTracks);

// Get several albums
router.get("/albums", getSeveralAlbums);

router.get("/albums/:albumId", getSingleAlbum);

router.get("/tracks/:trackId", getTrackDetails);

router.get("/search", getSearch);

export default router