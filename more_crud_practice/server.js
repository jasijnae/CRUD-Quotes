const express = require('express')
const bodyParser = require('body-parser')
const path = require('path') 
const app = express()
const MongoClient = require('mongodb').MongoClient


const connectionString = 'mongodb+srv://jasijnae_db_user:I3A3zqtcfX3UsDja@morecrudpractice.j1iczxj.mongodb.net/?appName=moreCRUDPractice' 
const PORT = 3000;



MongoClient.connect(connectionString)
    .then(client => { 
        console.log('Connected to DB') 
        const db = client.db('moreCRUDPractice')
        const quotesCollection = db.collection('quotes')

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(bodyParser.json())
        app.get('/', (req, res) => { 
            quotesCollection.find().toArray()
            .then(result => {
                    console.log(result)
                    res.render('index.ejs', { quotes: result}) 
                })
                .catch(err => console.error(err))
           
        })

        app.post('/quotes', (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then(result => {
                    //console.log('Saved to MongoDB', result)
                    res.redirect('/')
                })
                .catch(err => console.error(err))
        })

        app.put('/quotes', (req,res) => {
            quotesCollection.findOneAndUpdate(
                {name: 'Yoda'},
                {
                    $set:{
                        name:req.body.name,
                        quote:req.body.quote
                    }
                },
                {
                    upsert: true
                }
           )
           .then(result => {
                console.log(result)    
                res.json('Success')
               
            })
            .catch(err => console.error(err))
        })
        app.delete('/quotes',(req, res) =>{
            quotesCollection.deleteOne({name: req.body.name})
            .then(result => {
                if (result.deletedCount === 0){
                    return res.json('No Vader quotes')
                }
                 res.json('Deleted Dart Vader\'s quote') 
            })
            .catch(err => console.error(err))
        })
        app.listen(PORT, function() {
        console.log(`listening on port ${PORT}`)
        })
    })
    .catch(err => console.error(err))
