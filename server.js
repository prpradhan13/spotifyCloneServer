import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import spotifyRoute from "./routes/spotify.route.js"

dotenv.config({
    path: './.env'
})

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/spotify", spotifyRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});