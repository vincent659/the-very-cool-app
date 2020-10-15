const express = require('express');
const router = express.Router();
const axios = require('axios');
const Twit = require('twit');
const natural = require('natural');
const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;
const Sentiment = require('sentiment');
const io = require('../socket');

// Tweets Processing
router.post('/tweets', async (req, res) => {
  try {
    const keyWord = '#' + req.body.msg;

    // console.log(keyWord);

    let T = new Twit({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token: process.env.ACCESS_TOKEN,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    // T.get(
    //   'search/tweets',
    //   { q: `${keyWord} since:2020-01-01`, count: 10 },
    //   function (err, data, response) {
    //     res.json(data);
    //   }
    // );

    /* Twitter Stream Processing */
    // track is the word that we want to track
    var stream = T.stream('statuses/filter', {
      track: `${keyWord}`,
      language: 'en',
    });

    stream.on('tweet', function (tweet) {
      // text of the tweet
      console.log('Tweet: ' + tweet.text);
      let tweetPosts = tweet.text;

      console.log('Location: ' + tweet.user.location);
      let tweetLocation = tweet.user.location;

      /* Natural - Word Extraction Processing */
      // natural.PorterStemmer.attach();
      // tokenWords = tweetPosts.tokenizeAndStem();
      // console.log(tokenWords);

      /* Natural - Sentiment Analysis Processing */
      // let analyzer = new Analyzer('English', stemmer, 'senticon');
      // console.log(analyzer.getSentiment(tokenWords));
      // console.log(natural.PorterStemmer.stem('i like to play harding'));

      /* Sentiment - Sentiment Analysis Processing */
      let sentiment = new Sentiment();
      let result = sentiment.analyze(tweetPosts);
      console.log(result); // Score: -2, Comparative: -0.666

      // res.json(tweet);
    });

    // let analyzer = new Analyzer('English', stemmer, 'afinn');

    // console.log(analyzer.getSentiment(['I', 'hate', 'cherries']));
    // console.log(natural.PorterStemmer.stem('i like to play harding'));

    // Establishes socket connection
    // io.on('connection', (socket) => {
    //   getApiAndEmit(socket);
    //   // stream.on('tweet', function (tweet) {
    //   //   res.json(tweet);
    //   //   // console.log(tweet);
    //   // });
    //   socket.on('connection', () => console.log('Client connected'));
    //   socket.on('disconnected', () => console.log('Client disconnected'));
    // });

    // const getApiAndEmit = async (socket) => {
    //   try {
    //     stream.on('tweet', function (tweet) {
    //       res.json(tweet);
    //     });
    //     socket.emit('FromAPI', res.data); // Emitting a new message. It will be consumed by the client
    //   } catch (error) {
    //     console.error(`Error: ${error.code}`);
    //   }
    // };
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
