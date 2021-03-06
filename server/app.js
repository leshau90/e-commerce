require('dotenv').config()
const express = require('express');
const app = express();
const router = require('./routes')
const cors = require('cors')
const volleyball = require('volleyball')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose.connect((process.env.MONGOOSE_CONNECT_LOCAL || 'mongodb://localhost:27017/ecommerce'), { useNewUrlParser: true }, (err) => {
 if(err)console.log(`couldn't connect the mongo db`)
 else console.log(`connected to database on ${process.env.MONGOOSE_CONNECT_LOCAL}`)
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use
app.use(cors())
app.use(volleyball)
app.use('/hello',(req,res)=>{
    res.json({msg:'hello world'})
})
app.use('/',router)

app.use(function (error, req, res, next) {
    console.log('~~~catched by last error middlware~~~')
    if (error.fromRoute) console.log(error.fromRoute)
    console.log(error)
    console.log('~~~~~~')
    if (!error.statusCode) error.statusCode = 500
    res.status(error.statusCode).json({ message: error.message, error });
});

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app