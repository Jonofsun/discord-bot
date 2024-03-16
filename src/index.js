require("./server");
require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client({
  intents: [],
});

client.once("ready", () => {
  console.log("Bot is online!");
});

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
