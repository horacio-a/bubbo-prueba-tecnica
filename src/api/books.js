var express = require('express');
var router = express.Router();
let db = require('../db');
const cloudinary = require('cloudinary').v2;


router.post('/', async function (req, res) {
    const body = req.body
    try {
        console.log(body)
        const libroRef = await db.collection('books').add(body);
        const obj = (await libroRef.get()).data()
        body.id = libroRef.id
        res.json(body)

    } catch (error) {
        console.error('Error adding the book: ' + error);
        res.send('Error adding the book: ' + error)
    }
})

router.post('/multi', async function (req, res) {
    const body = req.body
    try {
        let response = []
        for (let i = 0; i < body.length; i++) {
            const element = body[i];
            const libroRef = await db.collection('books').add(element);
            response.push(libroRef.id)
        }

        res.json(response)

    } catch (error) {
        console.error('Error adding the book: ' + error);
        res.send('Error adding the book: ' + error)
    }
})

router.put('/:id', async function (req, res) {
    const body = req.body
    const id = req.params.id

    try {
        await db.collection("books").doc(id).update(body);
        const libroRef = await db.collection('books').doc(id).get()
        const obj = libroRef.data()
        obj.id = libroRef.id
        console.log(obj)
        res.json(obj)

    } catch (error) {
        console.error('Error while editing ' + error);
        res.send('Error while editing ' + error)
    }
})


router.delete('/:id', async function (req, res) {
    const body = req.body
    const id = req.params.id
    try {
        console.log('test')
        await db.collection('books').doc(id).delete()
        res.send(id)

    } catch (error) {
        console.error('Error while deleting ' + error);
        res.send('Error while deleting ' + error)
    }
})


router.get('/', async function (req, res) {
    try {
        const libroRef = await db.collection('books').get()
        res.json(libroRef.docs.map(doc => {
            obj = doc.data()
            obj.id = doc.id
            return obj
        }))

    } catch (error) {
        console.error('error when searching for books' + error);
        res.send('error when searching for books' + error);
    }
})


router.get('/:id', async function (req, res) {
    const id = req.params.id
    try {

        const libroRef = await db.collection('books').doc(id).get()
        const obj = libroRef.data()
        obj.id = libroRef.id
        res.json(obj)

    } catch (error) {
        console.error('error when searching for the book' + error);
        res.send('error when searching for the book' + error);
    }
})





module.exports = router;


