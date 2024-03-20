const { client } = require("./index");
// const bot = require("./index");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Guild } = require("discord.js");
// Initializing an Express application
const app = express();

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors());
// Defining a POST endpoint to send a message to a Discord channel
app.post("/send-message", async (req, res) => {
  // Extracting channelId and message from the request body
  const { channelId, message } = req.body;
  // expects a POST request with a JSON body containing the channelId and message
  try {
    // Fetching the channel by its ID and sending the message
    const channel = await client.channels.fetch(channelId);
    await channel.send(message);
    // Responding with a success status
    // console.log(channelId);
    // console.log(message);
    // bot.sendmessageInChat(message);
    res.status(200).json({ success: true });
  } catch (error) {
    // Logging the error and responding with an error status
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/findmember", async (req, res) => {
  const { guildID, memberNameOrID } = req.body;
  try {
    // console.log(req.body);
    // console.log(guildID);
    // console.log(memberNameOrID);
    // Fetching the guild by its ID
    const guild = await client.guilds.fetch(guildID);
    // Attempting to fetch the member by ID, then by username or nickname V
    let member = await guild.members.fetch(memberNameOrID).catch(() => null);
    if (!member) {
      member = guild.members.cache.find(
        (m) =>
          m.user.username === memberNameOrID || m.nickname === memberNameOrID
      );
    }
    // bot.MemberFoundInChat(guildID, memberNameOrID);

    // bot.sendmessageInChat("Found ", member.user.tag);
    // Responding with the member's tag if found, otherwise indicating failure
    if (member) {
      res.status(200).json({ success: true, member: member.user.tag });
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
  // if (member) {
  //   res.status(200).json({ member: member.user.tag });
  //   bot.sendmessageInChat("Found ", member.user.tag);
  // } else {
  //   res.status(404).json({ member: null });
  // }
});

app.post("/change-nickname", async (req, res) => {
  const { guildId, memberId, newNickname } = req.body;

  try {
    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch(memberId);
    await member.setNickname(newNickname);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/change-role", async (req, res) => {
  const { guildId, memberId, roleId } = req.body;

  try {
    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch(memberId);
    const role = await guild.roles.fetch(roleId);

    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }

    await member.roles.add(role);
    res.status(200).json({ success: true, message: "Role added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// Starting the Express server on the specified port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// how to get the bot to send a message with out promt from slash commands
// how to get the native app to call into the express server
