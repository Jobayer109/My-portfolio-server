const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uadfpu7.mongodb.net`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB and define route handlers
async function dbConnect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("portfolio");
    const projectCollection = db.collection("projects");
    const contributionsCollection = db.collection("contributions");

    // Define route handlers
    app.get("/", async (req, res) => {
      res.send("No worry, I'm alive");
    });

    // _______________________Projects______________________

    // _______________________Contributions______________________
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

dbConnect()
  .then(() => {
    // Start the server
    app.listen(port, () => {
      console.log(`Portfolio server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
