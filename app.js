const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const stripe = require('stripe')('sk_test_51MhsuUKRgv2CaMZJgM7NxJAscPwWUtbMwdaS7Yy3wYTYI8lBWnkVlbGCF90Co8FPqXRJlIu35AXIF9v6ZxGglp6Z00zKFZekTx');
const nodemailer = require('nodemailer')

const port = 8000

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('html'));
app.use("/style", express.static('style'));
app.use("/images", express.static('images'));
app.use("/scripts", express.static('scripts'));

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ivory.yundt@ethereal.email',
        pass: 'GYmWfY8xeHgmh2KgMX'
  }
})

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   port: 3306,
//   password: '17aezakmi',
//   database: 'shopbaseorders'
// });

var globalEmail = ''
var globalOrderId = null

console.log('kinda work')

app.post('/submit', async (req, res) => {
  const { name, surname, phone, mail, itemsArray, country, city, postcode, street, comment} = req.body;
  globalEmail = req.body.mail
  globalName = req.body.name
  globalAdress = req.body.street + ', ' + req.body.city

  let cartArray;
  try {
    cartArray = JSON.parse(itemsArray);
  } catch (err) {
    console.error(err);
    return res.status(400).send('Invalid JSON in itemsArray parameter');
  }

  const order_id = Math.floor(Math.random() * 9000) + 1000;
  globalOrderId = order_id
  
//   const customerSql = 'INSERT INTO customers (order_id, user_name, user_surname, user_phone, user_email) VALUES (?, ?, ?, ?, ?)';
//   connection.query(customerSql, [order_id, name, surname, phone, mail], async (error, customerResults, fields) => {
//     if (error) throw error;
//     console.log(`Customer data saved to database`);

//   const orderSql = 'INSERT INTO orders (order_id, item_name, item_quantity, item_size) VALUES (?, ?, ?, ?)';
//     for (let item of cartArray) {
//       connection.query(orderSql, [order_id, item.name, item.quantity, item.size], (error, orderResults, fields) => {
//         if (error) throw error;
//         console.log(`Item ${item.name} saved to database`);
//       });
//     }

//   const deliverySql = 'INSERT INTO delivery (order_id, country, city, postcode, street, a_comment) VALUES (?, ?, ?, ?, ?, ?)'
//   connection.query(deliverySql, [order_id, country, city, postcode, street, comment], async (error, deliveryResults, fields) => {
//     if (error) throw error;
//     console.log(`Delivery data saved to database`);
//   })
  
  console.log(`Name: ${name}, Surname: ${surname}, Phone: ${phone}, Email: ${mail}, Array: ${JSON.stringify(cartArray)}`);

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
      success_url: 'http://localhost:8000/submit.html',
      cancel_url: 'http://localhost:8000/cancel.html',
    });

    res.redirect(303, session.url);
  });
// });

app.post("/success", async (req, res) => {
  const event = req.body;

  var emailTitle = 
  `BEBXSHOP Order #${globalOrderId}`
  var emailText =
  `Hello, ${globalName}!
We have recieved your order #${globalOrderId}.
Shipping destination is - ${globalAdress}.
You can expect your order in a couple of days.`

  if (event.type === 'payment_intent.succeeded') {
    // const successPaymentSql = 'INSERT INTO orders (payment) VALUES ()'
    // connection.query(successPaymentSql )

    const mailSuccess = {
      from: 'ivory.yundt@ethereal.email',
      to: globalEmail,
      subject: emailTitle,
      text: emailText
    }

    transporter.sendMail(mailSuccess, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log("Email sent")
      }
    })
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || port, () => {
  console.log('Server started on port 8000');
});
