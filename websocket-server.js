const WebSocket = require('ws');
const scrapeHackerNews = require('./scraper');
const mysql = require('mysql2');

// WebSocket server setup
const wss = new WebSocket.Server({ port: 8080 });

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nani@2004',
  database: 'hacker_news'
});

// Send stories published in the last 5 minutes on initial connection
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Get stories from the last 5 minutes
  connection.execute(
    'SELECT COUNT(*) AS count FROM stories WHERE created_at >= NOW() - INTERVAL 5 MINUTE',
    (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        ws.send('Error fetching data');
      } else {
        ws.send(`Stories published in last 5 minutes: ${results[0].count}`);
      }
    }
  );

  // Periodically scrape data and send new stories to the client
  setInterval(async () => {
    await scrapeHackerNews();
    connection.execute('SELECT * FROM stories ORDER BY created_at DESC LIMIT 5', (err, rows) => {
      if (err) {
        console.error('Error fetching stories:', err);
      } else {
        const stories = rows.map(row => ({
          title: row.title,
          link: row.link,
          score: row.score,
          author: row.author,
          time: row.time,
          comments: row.comments
        }));

        // Send the latest stories to the client
        ws.send(JSON.stringify(stories));
      }
    });
  }, 60000); // Update every minute
});

// Start WebSocket server
console.log('WebSocket server running on ws://localhost:8080');
