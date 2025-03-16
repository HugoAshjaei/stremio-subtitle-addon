const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");
const { mapSubtitles } = require("./modules/mapSubtitles.js");

// Stremio manifest
const manifest = {
  id: "org.hugo.subtitles",
  version: "1.0.0",
  name: "Share Subtitles",
  description: "Share the subtitle URL here to add subtitles to Stremio.",
  resources: ["subtitles"],
  types: ["movie", "series"],
  idPrefixes: ["tt"],
  catalogs: [],
};

const builder = new addonBuilder(manifest);

builder.defineSubtitlesHandler(async ({ type, id }) => {
  console.log("Subtitles requested for", type, id);
  try {
    // Load subtitles JSON from GitHub
    const response = await axios.get(
      "https://raw.githubusercontent.com/hugoashjaei/stremio-subtitle-addon/main/subtitles.json?" +
        new Date().getTime()
    );
    const subtitlesData = response.data;

    const subtitles = mapSubtitles(subtitlesData[id] || []);

    console.log("Subtitles found:", subtitles);

    // Return subtitles if available for the given ID
    return { subtitles };
  } catch (error) {
    console.error("Error fetching subtitles:", error);
    return { subtitles: [] };
  }
});

serveHTTP(builder.getInterface(), { port: 7000 });
