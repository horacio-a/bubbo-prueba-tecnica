let express = require('express');
let cors = require('cors')
let books = require('./src/api/books');


let app = express()
let router = express.Router();
let port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/books', cors(), books)

app.listen(port, () => {
    console.log(port)
})

module.exports = { router };
