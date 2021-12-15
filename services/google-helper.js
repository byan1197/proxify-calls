const { google } = require("googleapis");

const GoogleHelper = {
  getPhotos: async () => {
    const auth = new google.auth.GoogleAuth({
      keyFile: "/home/b/app/fancyframe-1639457216847-52cd1f029c48.json",
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    const driveService = google.drive({ version: "v3", auth });
    const response = await driveService.files.list({
      q: "mimeType != 'application/vnd.google-apps.folder'",
      pageSize: 500,
      fields: "files(webContentLink)",
    });

    return response.data.files;
  },
};

module.exports = GoogleHelper;
