const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const fetch = require("node-fetch");

const url = "https://cricket-live-data.p.rapidapi.com/match/243299";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d2b0e34924mshbbe813a57723fc9p125952jsn69f16e8e0e23",
    "X-RapidAPI-Host": "cricket-live-data.p.rapidapi.com",
  },
};

const bot = new Telegraf("5785818339:AAHbEyF0GqZppsiThwx9YS8VIBPEQWVML5s");

bot.start((ctx) => ctx.reply("Hello from Ankush Ladani"));

const date = new Date();

let hours = date.getHours();

bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.hears("Hello", (ctx) => {
  if (hours >= 0 && hours <= 12) {
    ctx.reply("Good Morning...");
  } else if (hours > 12 && hours <= 16) {
    ctx.reply("Good Afternoon...");
  } else {
    ctx.reply("Good Evening...");
  }
});

bot.command("getResults", async (ctx) => {
  const response = await fetch(url, options);
  const data = await response.json();
  //   console.log(data.results.fixture.id);
  ctx.reply(`${data.results.live_details.match_summary.status}`);
});

bot.help((ctx) => ctx.reply("How Can I Help You?"));

bot.on();

bot.launch();
