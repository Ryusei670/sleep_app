const mongoose = require('mongoose')
const express = require('express')


(async () => {
    try{
        await mongoose.connect("mongodb+srv://ibes-user:Oyuq4boApnOf0j4C@sleepcluster.pmxtb.mongodb.net/Sleep?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
        )
        const App = express()

        App.use(express.json({extended:false}))
        App.get("/", (request, response) => {
            response.json({name: "hello world"})
        })
        App.listen(4000, () => {console.log("listening to port 4000")})
    } catch(e) {console.log(e)}

})()
