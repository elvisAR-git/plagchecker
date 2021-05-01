const express = require("express")
const mongo = require("mongodb")
const objectId = require("mongodb").ObjectID
router = express.Router()




// database connection string, update accordingly
const URI = "mongodb+srv://alan:alanray459@resturants.mesk5.mongodb.net/hotels?retryWrites=true&w=majority"


router.get("", (req, res) => {
    res.write("Resturant API running here")
    res.end()
})


router.get("/restaurants", (req, res) => {
    mongo.connect(URI, (err, client) => {
        var db = client.db("hotels")
        var resultsArray = []
        var coursor = db.collection('resturants').find()

        coursor.forEach((doc, err) => {
            resultsArray.push(doc)
        }, () => {
            client.close()
            res.send(resultsArray)
        });
    })
})


router.get("/restaurant/name/:name", (req, res) => {
    mongo.connect(URI, (err, client) => {
        var db = client.db("hotels")
        var resultsArray = []
        console.log(req.params.name)
        var coursor = db.collection('resturants').find({
            name: req.params.name
        })

        coursor.forEach((doc, err) => {
            resultsArray.push(doc)
        }, () => {
            client.close()
            res.send(resultsArray)
        });
    })
})

router.get("/restaurant/borough/:borough", (req, res) => {
    mongo.connect(URI, (err, client) => {
        var db = client.db("hotels")
        var resultsArray = []
        console.log(req.params.borough)
        var coursor = db.collection('resturants').find({
            borough: req.params.borough
        })

        coursor.forEach((doc, err) => {
            resultsArray.push(doc)
        }, () => {
            client.close()
            res.send(resultsArray)
        });
    })
})


router.get("/restaurant/cuisine/:cuisine", (req, res) => {
    mongo.connect(URI, (err, client) => {
        var db = client.db("hotels")
        var resultsArray = []
        var coursor = db.collection('resturants').find({
            cuisine: req.params.cuisine
        })

        coursor.forEach((doc, err) => {
            resultsArray.push(doc)
        }, () => {
            client.close()
            res.send(resultsArray)
        });
    })
})

router.post("/restaurants", (req, res) => {
    var record = {
        name: req.body.name,
        borough: req.body.borough,
        cuisine: req.body.cuisine,
        address: {
            street: req.body.address.street,
            building: req.body.address.building,
            zipcode: req.body.address.zipcode,
            coord: req.body.address.coord,
        },
        owner: req.body.owner,
        image: req.body.image

    }

    mongo.connect(URI, (err, client) => {

        var db = client.db("hotels")

        db.collection("resturants").insertOne(record, (err, response) => {
            client.close()
            res.send(response)
        })

    })
})


router.post("/update/restaurant", (req, res) => {
    var _id = req.body._id
    var record = {
        name: req.body.name,
        borough: req.body.borough,
        cuisine: req.body.cuisine,
        address: {
            street: req.body.address.street,
            building: req.body.address.building,
            zipcode: req.body.address.zipcode,
            coord: req.body.address.coord,
        },
        owner: req.body.owner,
        image: req.body.image

    }

    mongo.connect(URI, (err, client) => {

        var db = client.db("hotels")

        db.collection("resturants").updateOne({
            "_id": objectId(_id)
        }, {
            $set: record
        }, (err, response) => {
            client.close()
            res.send(response)
        })

    })
})

router.delete("/restaurant", (req, res) => {
    var _id = req.body._id
    mongo.connect(URI, (err, client) => {

        var db = client.db("hotels")

        db.collection("resturants").deleteOne({
            "_id": objectId(_id)
        }, (err, response) => {
            client.close()
            res.send(response)
        })

    })
})


module.exports = router