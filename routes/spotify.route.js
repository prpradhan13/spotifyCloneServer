import express from 'express';
import { getSingleAlbum, getSinglePlaylists, getSeveralAlbums, getPopularPlaylists, getSeveralArtists, getArtistTopTracks } from '../controllers/spotify.controller.js';

const router = express.Router();

router.post("/popular-playlists", getPopularPlaylists);

router.get("/playlists/:playlist_id", getSinglePlaylists);

// Get several artists
router.get("/artists", getSeveralArtists);

router.get("/artists/:artist_id/top-tracks", getArtistTopTracks);

// Get several albums
router.get("/albums", getSeveralAlbums);

router.get("/albums/:albumId", getSingleAlbum);

export default router