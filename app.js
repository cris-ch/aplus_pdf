const express = require('express');
const app = express();
const port = 3000;

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('pdfFile'), (req, res) => {
    // TODO: Convert PDF to image and send back the response
    res.send('PDF uploaded and conversion in progress...');
});


// Serve static files from the public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
