// terminal: cd to assignment3
// terminal: npm init
// terminal: npm i express mongoose
// terminal: npm i nodemon
// terminal: nodemon /server.js

const express = require('express');
const app = express();

app.listen(5000, (err) => {
  if (err) console.log();
  console.log('Server is running on port 5000');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const unicornSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  loves: [String],
  weight: Number,
  gender: {
    type: String,
    enum: ['m', 'f'],
  },
  vampires: Number,
  vaccine: Boolean,
});

const unicornModel = mongoose.model('unicorns', unicornSchema);

app.get('/unicorns', (req, res) => {
  unicornModel.find({ gender: 'f' }, (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});

// need this to parse HTTP body
app.use(express.urlencoded());
app.use(express.json());

app.post('/filteredUnicorns', (req, res) => {
  console.log(req.body);
  unicornModel.find({ name: req.body.unicornNameFromHTTPbody }, (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});

// need this to run the server
app.use(express.static('./public'));
// then go to localhost:5000/assignment3.html to see the page
