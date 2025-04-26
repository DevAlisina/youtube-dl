const express = require('express');
const { spawn } = require('child_process');
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

app.get('/download', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.send('No URL provided!');
  }

  // نام فایل خروجی رو تعیین کنیم
  res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');

  // yt-dlp رو اجرا کن
  const downloader = spawn('yt-dlp', ['-o', '-', videoUrl]);

  downloader.stdout.pipe(res);

  downloader.stderr.on('data', (data) => {
    console.error(`yt-dlp error: ${data}`);
  });

  downloader.on('close', (code) => {
    console.log(`Download finished with code ${code}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
