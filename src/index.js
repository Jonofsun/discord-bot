// require("./server");
require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Discord = require("discord.js");
var request = require("request");
// sessons: figure out how to type in a string of numbers to communicate with the api
const client = new Discord.Client({
  // Create a new Discord client with specific intents
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildIntegrations,
  ],
});
// Hardcoded channel and guild IDs for testing
const channelID = "1218014373327540367";
const guildId = "1218014373327540364";

let botOnlin = false;
client.on("ready", () => {
  // Event listener for when the bot is ready
  botOnlin = true;
  console.log(`Logged in as ${client.user.tag}!`);
  const guild_ids = client.guilds.cache.map((guild) => guild.id);
  prefix = "!";

  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
  // while loop that checks if the bot is online
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
client.on("disconnect", () => {
  botOnlin = false;
  console.log("Bot disconnected");
});
const sendmessageInChat = function (text) {
  // Initial attemp was to offload function so that i could access client and guild
  client.channels.cache.get(channelID).send(text);
};
const MemberFoundInChat = function (guildId, memberID) {
  // while this worked for the first http request I meet a hard wall in the found member chat
  const guild = client.guilds.cache.get(guildId);
  let member = guild.members.cache.get(memberID);

  if (!member) {
    member = guild.members.cache.find(
      (m) => m.user.username === memberNameOrID || m.nickname === memberNameOrID
    );
  }
};
client.on("messageCreate", (message) => {
  // Event listener for message creation started project testing this out
  if (message.content === prefix + "ping") {
    message.channel.send("Pong!");
  } else if (message.content.includes("!nickname")) {
    message.member.setNickname(
      message.content.replace(prefix + "nickname ", "")
    );
  }
});
// Log in the client using the token from environment variables
client.login(process.env.TOKEN);
// (async () => {
//   while (true) {
//     if (botOnlin) {
//       console.log("Bot is online!");
//     } else {
//       console.log("Bot is offline.");
//     }
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//   }
// })();
// module.exports = {
//   sendmessageInChat,
//   MemberFoundInChat,
// };
module.exports = { client };
// Export the client object for use in other files
