import SpotifyWebApi  from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

// Get access token from Spotify
spotifyApi.clientCredentialsGrant().then(
    (data) => {
        console.log("Access token from Spotify Recieved");
        spotifyApi.setAccessToken(data.body["access_token"]);
    },
    (err) => {
        console.error("Error retrieving access token", err);
    }
)

export default spotifyApi;