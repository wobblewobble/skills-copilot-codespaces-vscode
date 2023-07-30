// Create web server
// 1. Create web server
// 2. Create a router
// 3. Create a route handler
// 4. Start the server

// 1. Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

// 2. Create a router
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// 3. Create a route handler
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex'); // generate random id
  const { content } = req.body; // get content from request body

  const comments = commentsByPostId[req.params.id] || []; // get comments from post id
  comments.push({ id: commentId, content }); // add new comment to comments array
  commentsByPostId[req.params.id] = comments; // assign comments to post id

  res.status(201).send(comments); // return comments
});

// 4. Start the server
app.listen(4001, () => {
  console.log('Listening on 4001');
});