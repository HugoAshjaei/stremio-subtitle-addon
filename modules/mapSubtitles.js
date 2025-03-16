const { mapGoogleDriveUrl } = require("./mapGoogleDriveUrl.js");

const mapSubtitles = (subtitles) => {
  return subtitles.map((subtitle) => ({
    url: mapGoogleDriveUrl(subtitle.url),
    lang: subtitle.lang,
    id: new Date().getTime().toString(),
  }));
};

module.exports = { mapSubtitles };
