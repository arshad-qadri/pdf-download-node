const express = require('express');
const cors = require('cors');
const router = require('./src/routes');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use("/" , router)

app.get("/",  async (req, res) => {
  res.json({message:"Hello world!"})
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
