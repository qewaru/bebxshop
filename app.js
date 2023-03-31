const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const port = 8000

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('html'));
app.use("/style", express.static('style'));
app.use("/images", express.static('images'));
app.use("/scripts", express.static('scripts'));

app.use(cors());

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', allowedMethods.join(','));
  next();
});

app.post('/submit', cors(), async (req, res) => {
  const itemsArray = req.body.itemsArray
  let cartArray;
  try {
    cartArray = JSON.parse(itemsArray);
  } catch (err) {
    console.error(err);
    return res.status(400).send('Invalid JSON in itemsArray parameter');
  }
  console.log(cartArray)
});

app.listen(process.env.PORT || port, () => {
  console.log('Server started on port 8000');
});
