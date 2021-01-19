const express = require('express');
var cors = require('cors');

let app = express();
let locale = "en-us";

// enable CORS so that the API is remotely testable by FCC 
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// if it's the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

// if it's the api endpoint, with empty param
app.get('/api/timestamp/', (req, res) => res.json({
  unix: new Date().getTime(),
  utc: new Date().toUTCString(),
}));

// if it's the api endpoint
app.get('/api/timestamp/:date', (req, res) => {
  let { date } = req.params;
  let result = handleInput(date);
  // returns JSON object
  res.json(result);
});

function handleInput(input) {
  // TODO improve regex...
  let unixRegex = /\D/;

  console.log(input);

  if (!unixRegex.test(input)) {
    // it's a number
    const unix = Number(input);
    return ({ unix, utc: new Date(unix).toUTCString() });
  } else {
    // it's a text value
    const date = new Date(input);
    if (!unixRegex.test(date.getTime())) {
      // it's valid
      return ({ unix: date.getTime(), utc: date.toUTCString() });
    } else {
      // not valid
      return ({ error: "Invalid Date" });
    }
  }

}

// listen for requests
const listener = app.listen(process.env.PORT || 7767, () => {
  console.log(`App listening on port ${listener.address().port} 🚀🚀🚀`)
})