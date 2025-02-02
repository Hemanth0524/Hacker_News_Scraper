# Hacker_News_Scraper
- Scrape Hacker News: Periodically scrape stories from Hacker News (https://news.ycombinator.com/). - WebSocket Streaming: Broadcast real-time updates (new stories) to clients and send number of stories published in last 5 minutes only on initial connection. - MySQL Integration: Use MySQL for data storage and management.

# Hacker News Scraper and WebSocket Broadcast

This project is a Node.js service that scrapes real-time stories from Hacker News, stores them in MySQL, and broadcasts updates to clients via WebSocket. Additionally, it provides a REST API to fetch the latest stories.

## Features

- Scrapes real-time Hacker News stories.
- Stores scraped data in MySQL.
- Broadcasts updates to connected clients via WebSocket.
- Provides a REST API to fetch the latest stories.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (Node package manager)

## Setup

### 1. Clone the repository

Clone the project to your local machine using the following command:
git clone https://github.com/hemanth0524/hacker-news-scraper.git

# Install dependencies
Navigate to the project folder and install the necessary dependencies:
cd hacker-news-scraper
npm install

Set up MySQL database
Create a MySQL database for storing the Hacker News stories.

You can do this via MySQL CLI or a GUI tool like MySQL Workbench.
Create a table called stories to store the scraped data.
## MYSQL code
CREATE DATABASE hacker_news;

USE hacker_news;

 CREATE TABLE stories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  link VARCHAR(255),
  score INT,
  author VARCHAR(255),
  time VARCHAR(50),
  comments INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * from stories 

### Results

### Data stored in MYSQL database:

![Database_for_scraped_data](https://github.com/user-attachments/assets/1be63939-5f37-4430-ac0f-41acc0d7ed26)


# Web scraping done for very one minute

![Webscraping_every_minute](https://github.com/user-attachments/assets/a5541657-b96c-4ab1-a42e-9b2dcf714157)

### Client Connection

![Client_connection](https://github.com/user-attachments/assets/c33d1e38-3c39-4a20-abcf-ee4c0583e25e)

### Client_interface

![Latest_5_stories](https://github.com/user-attachments/assets/145c8393-cdf7-4936-986d-7d2b4a7f479c)





### Update database credentials in the project. Ensure that the MySQL credentials (username, password, database) in the scraper.js and websocket-server.js files match your MySQL setup.

### Once the dependencies are installed and MySQL is set up:
Start the WebSocket server and the scraping process by running the following command:

node websocket-server.js

This will start the WebSocket server on port 8080 and periodically scrape stories from Hacker News, updating MySQL and broadcasting updates via WebSocket.

### Usage:
WebSocket
Once the WebSocket server is running, you can connect to it using a WebSocket client. 
### WebSocket Message Flow:
- When a client first connects, the server will send the number of stories published in the last 5 minutes.
- The server will then periodically scrape new stories and broadcast them to the connected client.

### REST API
The project exposes a REST API that allows you to fetch the latest stories.

