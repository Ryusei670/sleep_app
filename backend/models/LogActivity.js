const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    username: {type: String},
    sleep_time: {type: Date},
    wake_time: {type: Date},
    len: {type: Number}
})

const Logs = mongoose.model("Log", LogSchema)

module.exports = Logs