const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

// Configure multer for file uploads
const upload = multer({dest: 'uploads/'});

// Serve static files
app.use(express.static('public'));

// Route to serve files inline
app.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline');

  fs.createReadStream(filePath).pipe(res);
});

// Route to handle file upload
app.post('/upload', upload.single('pdfFile'), (req, res) => {
  const file = req.file;

  res.send(`<a href="/file/${file.filename}">View uploaded file</a>`);
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
