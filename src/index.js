let express = require('express');
let cors = require('cors')
let books = require('./api/books');



let app = express()
let router = express.Router();
let port = process.env.PORT || 3000;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));



app.use('/books', cors(), books)

app.listen(port, () => {
    console.log(port)
})

module.exports = { router };
