const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require('mysql2');

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: 'Nani@2004', // replace with your MySQL password
  database: 'hacker_news'
});

// Scraping Hacker News
async function scrapeHackerNews() {
  try {
    // Send HTTP request to fetch HTML from Hacker News
    const response = await axios.get('https://news.ycombinator.com/');
    const $ = cheerio.load(response.data);

    // Loop through each story on the page
    $(".athing").each((index, element) => {
      const title = $(element).find('.titleline a').text();
      const link = $(element).find('.titleline a').attr('href');
      // Get the subtext row which is the next sibling of the .athing row
      const subtext = $(element).next();
      
      // Extract score, author, time, and comments from the subtext row
      const scoreText = subtext.find('.score').text();
      const score = scoreText ? parseInt(scoreText.replace(' points', '')) : 0;
      
      const author = subtext.find('.hnuser').text();
      const time = subtext.find('.age').text();
      
      // For comments, check if the last anchor contains the word "comment"
      const commentText = subtext.find('a').last().text();
      const comments = commentText.includes('comment') ? parseInt(commentText) || 0 : 0;

      /*const score = $(element).find('.score').text() ? parseInt($(element).find('.score').text()) : 0;
      const author = $(element).find('.hnuser').text();
      const time = $(element).find('.age').text();
      const comments = $(element).find('.subtext a').last().text() ? parseInt($(element).find('.subtext a').last().text()) : 0;*/

      // Insert story into MySQL
      connection.execute(
        'INSERT INTO stories (title, link, score, author, time, comments) VALUES (?, ?, ?, ?, ?, ?)',
        [title, link, score, author, time, comments],
        (err, result) => {
          if (err) {
            console.error('Error inserting data into MySQL:', err);
          } else {
            console.log('Inserted story into MySQL:', title);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error scraping Hacker News:', error);
  }
}

module.exports = scrapeHackerNews;
