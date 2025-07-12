const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/check-number", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const response = await fetch("https://virtual-phone-numbers-detector.p.rapidapi.com/check-number", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "virtual-phone-numbers-detector.p.rapidapi.com",
        "x-rapidapi-key": process.env.API_KEY
      },
      body: JSON.stringify({ phone })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
