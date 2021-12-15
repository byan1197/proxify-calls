const { google } = require("googleapis");

const GoogleHelper = {
  getPhotos: async () => {
    const credentials = JSON.parse(process.env.google_credentials);
    credentials.private_key = credentials.private_key.replace(
      new RegExp("\\\\n", "g"),
      "\n"
    );
    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
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
