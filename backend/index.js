const mongoose = require('mongoose');
const express = require('express');
const Logs = require('./models/LogActivity');
const cors = require('cors');
const { restart } = require('nodemon');

(async () => {
    try{
        await mongoose.connect("mongodb+srv://ibes-user:Oyuq4boApnOf0j4C@sleepcluster.pmxtb.mongodb.net/Sleep?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
        ).then(e => {console.log('Database connected...')})
        
        const App = express()

        App.use(cors())

        App.use(express.json({extended:false}))
        App.get("/", (request, response) => {
            response.json({name: "hello world"})
        })

        App.post("/api/log", async (req, resp) => {
            console.log(req.body)
            const log = await Logs.create({
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                sleep_time: req.body.sleep_time,
                wake_time: req.body.wake_time,
                len: req.body.len
            })
            resp.send("log added")
        })

        App.get("/api/logs/:user", async (req, resp) => {
          try{
            const logs = await Logs.find({username: req.params.user})
            return resp.json(logs)
          }
          catch{
              resp.send("Error")
          }
        })
        App.listen(4000, () => {console.log("listening to port 4000")})
    } catch(e) {console.log(e)}

})()
