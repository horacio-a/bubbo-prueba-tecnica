var express = require('express');
var router = express.Router();
let db = require('../db')


router.post('/', async function (req, res) {
    const body = req.body
    try {

        const libroRef = await db.collection('books').add({
            titulo: body.titulo,
            autor: body.autor,
            categoria: body.categoria
        });

        const obj = (await libroRef.get()).data()
        obj.id = libroRef.id
        res.json(obj)

    } catch (error) {
        console.error('Error adding the book: ', error);
        res.send('Error adding the book: ', error)
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
        res.json(obj)

    } catch (error) {
        console.error('Error while editing ', error);
        res.send('Error while editing ', error)
    }
})


router.delete('/:id', async function (req, res) {
    const body = req.body
    const id = req.params.id
    try {

        const libroRef = await db.collection('books').doc(id).delete()
        res.send(id)

    } catch (error) {
        console.error('Error while deleting ', error);
        res.send('Error while deleting ', error)
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
        console.error('error when searching for books', error);
        res.send('error when searching for books', error);
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
        console.error('error when searching for the book', error);
        res.send('error when searching for the book', error);
    }
})


module.exports = router;
