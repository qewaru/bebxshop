const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config()
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`)
// const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const db = mongoose.connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `${process.env.DB_URI}`

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}
connect()


const port = 8000
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('html'));
app.use("/style", express.static('style'));
app.use("/images", express.static('images'));
app.use("/scripts", express.static('scripts'));

// const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'ivory.yundt@ethereal.email',
//         pass: '${process.env.MAILER_PASSWORD}'
//   }
// })

var globalEmail = ''
var globalOrderId = null

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

  var customerData = {
    "order_id": order_id,
    "user_name": name,
    "user_surname": surname,
    "user_phone": phone,
    "user_email": mail
  }

  const orderData = cartArray.map(item => {
    return {
      "order_id": order_id,
      "item_name": item.name,
      "item_quantity": item.quantity,
      "item_size": item.size,
    }
  })
  
  const deliveryData = {
    "order_id": order_id,
    "country": country,
    "city": city,
    "postcode": postcode,
    "street": street,
    "comment": comment
  }
  
  db.collection("customers").insertOne(customerData, async (error, collection) => {
    if(error) {
      throw error
    }
    console.log("Customer data saved to database")
    db.collection("orders").insertMany(orderData, async (error, collection) => {
      if(error) {
        throw error
      }
      console.log("Order data saved to database")
      db.collection("delivery").insertOne(deliveryData, async (error, collection) => {
        if(error) {
          throw error
        }
        console.log("Delivery data saved to database")
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
          success_url: 'https://https://bebxshop.onrender.com/submit.html',
          cancel_url: 'https://https://bebxshop.onrender.com/cancel.html',
        })
        res.redirect(303, session.url);
      })
    })
  })
})

// app.post("/success", async (req, res) => {
//   const event = req.body;

//   var emailTitle = 
//   `BEBXSHOP Order #${globalOrderId}`
//   var emailText =
//   `Hello, ${globalName}!
// We have recieved your order #${globalOrderId}.
// Shipping destination is - ${globalAdress}.
// You can expect your order in a couple of days.`

//   if (event.type === 'payment_intent.succeeded') {
//     const mailSuccess = {
//       from: 'ivory.yundt@ethereal.email',
//       to: globalEmail,
//       subject: emailTitle,
//       text: emailText
//     }

//     transporter.sendMail(mailSuccess, (error, info) => {
//       if (error) {
//         console.log(error)
//       } else {
//         console.log("Email sent")
//       }
//     })
//   }

//   res.sendStatus(200);
// });

app.listen(process.env.PORT || port, () => {
  console.log('Server started on port 8000');
});
