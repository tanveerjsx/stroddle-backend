const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const passport = require("passport");
const cors = require('cors');
require('dotenv/config');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:3008"]
    }
  },
  // ['.routes/*.js']
  apis: ["app.js"]
};
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const authenticate = require('./middlewares/auth');
const stroller= require('./routes/stroller')
const category=require('./routes/category')
const feature=require('./routes/feature')
const brand=require('./routes/brand')
const agegroup=require('./routes/ageGroup')
const color=require('./routes/color')
const weight=require('./routes/weight')
const type=require('./routes/type')
const rent=require('./routes/rent')
const model=require('./routes/model')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./public'))
const port = process.env.PORT || 3008

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const mongoDB = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}${process.env.MONGODB_URI}`;
mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}${process.env.MONGODB_URI}`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: false },
  )
  .then(() => console.log('DB Connected'))
  .catch(error => {
    console.log('connection error', error.message);
  });
app.use(passport.initialize());
require("./config/passport");

/**
 * @swagger
 * /user/:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 * /user/signup:
 *  post:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.use('/user', auth);

app.use('/profile' , profile);
app.use('/category',category)
app.use('/stroller',stroller)
app.use('/feature',feature)
app.use('/brand',brand)
app.use('/type',type)
app.use('/weight',weight)
app.use('/color',color),
app.use('/ageGroup',agegroup)
app.use('/model',model)
app.use('/rent',rent)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port,()=>{console.log(`Running on port ${port}`)});
