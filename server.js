const express = require('express')
const mongoose = require('mongoose')
const Drink = require('./models/drink')
const drinkRouter = require('./routes/drinks')
const methodOverride = require('method-override')
const app = express()

const connectionString = 'mongodb+srv://dinozauras:PR5cGkv5497n-@cluster0.p4km3.mongodb.net/test';
//const connectionString = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

main().catch((err) => console.log(err));
async function main() {
    console.log("Connecting to database: " + connectionString);
    await mongoose.connect(connectionString);
    console.log("Connection was successful");
}

/*mongoose.connect(connectionString, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})*/

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const drinks = await Drink.find().sort({ createdAt: 'desc' })
    //console.log(drinks)
    res.render('drinks/index', { drinks: drinks })
})

app.use('/drinks', drinkRouter)

app.listen(5000)