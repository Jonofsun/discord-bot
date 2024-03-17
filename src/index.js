// require("./server");
require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Discord = require("discord.js");
var request = require("request");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildIntegrations,
  ],
});
const channelID = "1218014373327540367";
client.once("ready", () => {
  const guild_ids = client.guilds.cache.map((guild) => guild.id);

  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

  console.log("Bot is online!");
  console.log(guild_ids);
  // var Options = {
  //   uri: "https://discord.com/api/webhooks/1218819527156961341/GPnX1gsbO4OReqvk1_KXe-wz7sEDi8Vbg2jf1J4JdfM3anLhxrU6fqUpgkx5XXdh53aK",
  //   body: JSON.stringify({ content: "hello, world" }),
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  // request(Options, function (error, response) {
  //   console.log(error, response);
  //   return;
  // });

  // rest.post(Routes.channelMessages(channelID), {
  //   content: "Hello,world",
  // });
});
const sendmessageInChat = function (text) {
  client.channels.cache.get(channelID).send(text);
};
client.on("messageCreate", (message) => {
  if (message.content === "!ping") {
    message.channel.send("Pong!");
  }
});

// app.use(express.json()); // Middleware to parse JSON bodies

// app.post("/send-message", (req, res) => {
//   const { channelId, message } = req.body;

//   const channel = client.channels.cache.get(channelId);
//   if (channel) {
//     channel
//       .send(message)
//       .then(() => res.status(200).json({ success: true }))
//       .catch((error) =>
//         res.status(500).json({ success: false, error: error.message })
//       );
//   } else {
//     res.status(404).json({ success: false, error: "Channel not found" });
//   }
// });

// const app = express();
// app.use(bodyParser.json());

// app.post("/post-endpoint", (req, res) => {
//   const { message } = req.body;

//   // Send a message to a specific channel
//   const channel = client.channels.cache.get(process.env.channelID);
//   if (channel) {
//     channel.send(message);
//   }

//   res.status(200).send("Message sent!");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
client.login(process.env.TOKEN);
module.exports = {
  sendmessageInChat,
};
