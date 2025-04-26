const express = require('express');
const playdl = require('play-dl');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>YouTube Downloader</h1>
    <form action="/download" method="get">
      <input type="text" name="url" placeholder="Enter YouTube URL" required style="width:300px;"/>
      <button type="submit">Download</button>
    </form>
  `);
});

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.send('No URL provided!');

  try {
    const info = await playdl.video_info(videoUrl);
    const stream = await playdl.stream_from_info(info);

    res.header('Content-Disposition', `attachment; filename="video.mp4"`);
    stream.stream.pipe(res);

  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to download video.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
