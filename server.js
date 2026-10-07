const express = require('express')
const app = express()
const PORT = 8000

const salt = {

    'redmond': {
    'sodium': '530 mg',
    'potassium': '0 mg', 
    'magnesium': '0 mg'
},
    'red_diamond': {    
    'sodium': '280 mg',
    'potassium': '0 mg',
    'magnesium': '0 mg'
},
'celtic_sea_salt': {    
    'sodium': '480 mg',
    'potassium': '1 mg',
    'magnesium': '3 mg'
},
    'unknown':{
        'sodium': 'unknown',
        'postassium': 'unknown',
        'magnessium': 'unknown',
    },

}

//If they make a request to the webpage respond with...
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')

})

//if request made to api respond with 
app.get('/api/:name', (req, res)=>{
    //add to return specific piece of information
    const saltName = req.params.name.toLowerCase()
    //if the name is in the object
    if(salt[saltName]){
        //respond with salt name
        res.json(salt[saltName])
    }else{
        res.json(salt['unknown'])
    }

    //add to return specific all information
    //res.json(salt)

})


//listen is set up to tell server where to run server???double check is correct
app.listen(PORT, ()=>{
    console.log(`This server is running on port ${PORT}. Testing for accuracy`)

})

