const express = require('express');
const bodyParser = require('body-parser');

const port = 8000

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('html'));
app.use("/style", express.static('style'));
app.use("/images", express.static('images'));
app.use("/scripts", express.static('scripts'));

app.post('/submit', async (req, res) => {
  const order_id = Math.floor(Math.random() * 9000) + 1000;
  console.log(order_id)
});

app.listen(process.env.PORT || port, () => {
  console.log('Server started on port 8000');
});
