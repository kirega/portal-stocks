
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Static files
app.use(express.static(path.join(__dirname, 'dist')));

// wildcard route
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`))
});
