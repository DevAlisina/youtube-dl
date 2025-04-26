const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Youtube Downloader</h1>
    <form action="/download" method="GET">
      <input type="text" name="url" placeholder="Enter Youtube URL" required style="width:300px;">
      <button type="submit">Download</button>
    </form>
  `);
});

app.get('/download', async (req, res) => {
  const url = req.query.url;
  if (!ytdl.validateURL(url)) {
    return res.send('Invalid URL!');
  }
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(url, { format: 'mp4' }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
