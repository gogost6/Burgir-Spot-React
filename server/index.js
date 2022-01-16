const express = require("express");
const path = require("path");

const databaseConfig = require("./config/database");

const expressConfig = require("./config/express");
const storage = require("./middlewares/storage");

const allowed = [".js", ".css", ".png", ".jpg"];

const port = process.env.PORT || 5000;
const app = express();

databaseConfig(app);
app.use(storage());

expressConfig(app);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
	app.use(express.static(path.join(__dirname, 'burgir-spot-react/build')));
// Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'burgir-spot-react/build', 'index.html'));
  });
}

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);