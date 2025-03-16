const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const axios = require("axios");
const { mapSubtitles } = require("./modules/mapSubtitles.js");

const PORT = process.env.PORT || 8080; // Ensure dynamic port handling

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
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/hugoashjaei/stremio-subtitle-addon/main/subtitles.json?" +
        new Date().getTime()
    );
    const subtitlesData = response.data;
    const subtitles = mapSubtitles(subtitlesData[id] || []);
    return { subtitles };
  } catch (error) {
    console.error("Error fetching subtitles:", error);
    return { subtitles: [] };
  }
});

// Explicitly log the PORT to verify it's listening
console.log(`🚀 Stremio Add-on is starting on PORT: ${PORT}`);

// Start the HTTP Server
serveHTTP(builder.getInterface(), { port: PORT })
  .then(() => {
    console.log(`✅ Stremio Add-on successfully listening on PORT: ${PORT}`);
  })
  .catch((error) => {
    console.error("❌ Failed to start Stremio Add-on:", error);
  });
