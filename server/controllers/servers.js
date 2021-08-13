const { log } = require('debug');
const Server = require('../models/server_model');

exports.findAll = (req, res) => {
    Server.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        return res.json(result);
    })
}

exports.addServer = (req, res) => {
    const newServer = {
        ipAddress: req.body.ipAddress,
        Name: req.body.name,
        Type: {
            Name: req.body.typeName,
            pricePerMinute: req.body.pricePerMinute
        },
        Running: {
            isRunning: false,
        }
    }
    Server.create(newServer, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            return (res.json({ ...result._doc, message: 'server added' }))
        }
    })
}

exports.serverOn = (req, res) => {
    const updateServer =
    {
        Running: {
            isRunning: req.body.isRunning,
            startTime: new Date()
        }
    }
    console.log(updateServer)
    Server.findByIdAndUpdate({ _id: req.params.id }, updateServer, (err, result) => {
        if (err) {
            res.send(err)
        }
        console.log(result)
        return res.json(result);
    })
};


exports.deleteServer = (req, res) => {
    Server.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
        if (err) {
            res.send(err)
        }
        return res.json(result);
    });
};