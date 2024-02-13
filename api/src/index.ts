import app from './app';
import DiscordBot from './bot/bot';

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`\x1b[33m[LOGS]:\x1b[0m Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

DiscordBot.getInstance();
