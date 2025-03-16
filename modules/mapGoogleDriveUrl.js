const mapGoogleDriveUrl = (url) => {
  // if url is not a google drive url, return the url
  if (!url.startsWith("https://drive.google.com")) {
    return url;
  }
  // extract the file id from the url
  const fileId = url.match(/[-\w]{25,}/)[0];
  // construct the direct download link
  return `https://drive.google.com/uc?id=${fileId}&export=download`;
};

module.exports = { mapGoogleDriveUrl };
