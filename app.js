const multer = require('multer');
const fs = require('fs').promises;
const express = require('express');
const app = express();

app.use(multer().none());

app.get('/CardInfo', async function (req, res) {
  let contents = await fs.readFile('./public/CardInfo.json', 'utf8');
  let posts = JSON.parse(contents);
  res.json(posts);
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);