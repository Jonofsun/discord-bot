const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.post("/send-message", async (req, res) => {
  const { channelId, message } = req.body;
  // expects a POST request with a JSON body containing the channelId and message
  const channel = client.channels.cache.get(channelId);
  try {
    const channel = await client.channels.fetch(channelId);
    await channel.send(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
