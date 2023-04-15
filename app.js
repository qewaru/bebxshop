// import { authenticateUser } from "/auth.js"

const express = require('express');
const bodyParser = require('body-parser');

const port = 8000

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('public'));
// app.use("/style", express.static('style'));
// app.use("/images", express.static('images'));
// app.use("/scripts", express.static('scripts'));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.post('/submit', async (req, res) => {
  const itemsArray = req.body.itemsArray
  let cartArray;
  try {
    cartArray = JSON.parse(itemsArray);
    console.log(cartArray)
  } catch (err) {
    console.error(err);
    return res.status(400).send('Invalid JSON in itemsArray parameter');
  }
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartArray.map(item => {
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        }
      }),
      mode: 'payment',
      success_url: 'https://bebxshop.cyclic.app/html/submit.html',
      cancel_url: 'https://bebxshop.cyclic.app/html/cancel.html',
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating Stripe session');
  }
});

app.listen(process.env.PORT || port, () => {
  console.log('Server started on port 8000');
});
