const mongoose = require('mongoose');
const express = require('express');
const Logs = require('./models/LogActivity');
const Users = require('./models/Users');
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

        //send new activity
        App.post("/api/log", async (req, resp) => {
            const check = await Logs.find(req.body)

            console.log(check.length)

            if(check.length === 0) {
                const log = await Logs.create(req.body)
                // console.log("successful post")
                resp.send(req.body)
            } else {
                // console.log("bad try")
                resp.send({})
            }
        })

        //get user's activity log
        App.get("/api/logs/:user", async (req, resp) => {
          try{
            const logs = await Logs.find({username: req.params.user})
            return resp.json(logs)
          }
          catch{
              resp.send("Error")
          }
        })

        //login - check if user exists and sign in
        App.post("/api/signin/", async (req, resp) => {
            console.log("inside post for login")
          try{
            const users = await Users.find({
                "username": req.body.username,
                "passHash": req.body.password
            })
            console.log(users)
            // return resp.json(users[0])
            if(users.length > 0) console.log("user found")
            return (users.length > 0) ? resp.json(users[0]) : resp.json({});
          }
          catch{
              console.log("got error")
              resp.send("Error")
          }
        })
        
        //register - add new user
        App.post("/api/newuser/", async (req, resp) => {
            const check = await Users.find({
                "username": req.body.username
            });

            console.log(check.length)

            if(check.length === 0) {
                const log = await Users.create({
                    "username": req.body.username,
                    "first_name": req.body.first_name,
                    "last_name": req.body.last_name,
                    "passHash": req.body.password
                })
                // console.log("successful post")
                resp.send(req.body)
            } else {
                // console.log("bad try")
                resp.send({})
            }
          })
          
          App.listen(4000, () => {console.log("listening to port 4000")})

        
    } catch(e) {console.log(e)}

})()
