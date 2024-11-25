const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint to fetch the next event ID
app.get("/", (req, res) => {
  // Read the "database" file
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading database:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Parse the database content
    const db = JSON.parse(data);

    // Increment the event ID
    db.currentEventId += 1;

    // Save the updated database back to the file
    fs.writeFile("db.json", JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.error("Error writing to database:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Respond with the new event ID
      res.json({ nextEventId: db.currentEventId });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
