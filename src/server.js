const bot = require("./index");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Guild } = require("discord.js");
const app = express();

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors());
app.post("/send-message", async (req, res) => {
  const { channelId, message } = req.body;
  // expects a POST request with a JSON body containing the channelId and message
  // const channel = client.channels.cache.get(channelId);
  try {
    // const channel = await client.channels.fetch(channelId);
    // await channel.send(message);
    // console.log(channelId);
    // console.log(message);
    bot.sendmessageInChat(message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.post('/findmember', (req, res) => {
  const { guildId, memberNameOrID } = req.body;

  // Find the member in the guild
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
  }

  const member = guild.members.cache.find(member => member.user.username === memberNameOrID || member.id === memberNameOrID);
  if (member) {
      res.json({ member: member.user.tag });
      bot.sendmessageInChat("Found ",member.user.tag);
  } else {
      res.status(404).json({ error: 'Member not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// how to get the bot to send a message with out promt from slash commands
// how to get the native app to call into the express server
