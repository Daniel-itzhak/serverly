let mongoose = require("mongoose")
require("dotenv").config()

mongoose.set('returnOriginal', false)
mongoose.connect(`mongodb+srv://daniel:${process.env.MONGO_PASS}@cluster0.hkrpb.mongodb.net/severly?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.on("connected", () => console.log("Mongo database is connected"))
mongoose.connection.on("error", (err) => console.log(err))