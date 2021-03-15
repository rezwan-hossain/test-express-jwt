const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/auth');

const app = express();

mongoose.connect('mongodb+srv://test:test@cluster0.8ydox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> console.log('database in connected'))
        .catch(err => console.log(err));
        
app.use(express.json());


//route middlewere
app.use('/api/users', userRoute);

app.listen(8000, ()=>{
    console.log('server is running in port 8000');
})
