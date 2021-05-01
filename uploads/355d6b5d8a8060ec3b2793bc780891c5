const express = require("express")
const router = express.Router()
const DB = require("./DatabaseService.js")
var crypto = require('crypto')
var fs = require('fs')

let MyDB



const parseString = require('xml2js').parseString


var HOST
var USER
var PASSWORD_TXT
var DATABASE
var PORT

let data = fs.readFileSync("dbconfig.xml")
data = data.toLocaleString()

let parse = parseString(data, (err, res) => {
    if (err) console.log(err)
    HOST = res.dbconfig.host[0]
    USER = res.dbconfig.user[0]
    PASSWORD_TXT = res.dbconfig.password[0]
    DATABASE = res.dbconfig.database[0]
    PORT = res.dbconfig.port[0]
})

DB.connect(DATABASE).then((database) => {
    MyDB = database
}).catch((err) => {
    console.log("Could not connect to Database: ", err)
})

router.get("/getListOfUsers", (req, res) => {
    DB.fetch(MyDB, "tbl_accounts", 0).then(data => {
        console.log("[+] successfully fetched users")
        res.status(200).send(data)
    }).catch(err => {
        console.log(err)
        res.status(200).send({})
    })
})


router.post("/addUser", (req, res) => {
    var user = req.body
    user.acc_password = crypto.createHash('sha256').update(user.acc_password).digest('base64')

    DB.push(MyDB, "tbl_accounts", user).then(response => {
        console.log(`User ${user.acc_login} Added`)
        user.flag = true
        user.acc_id = response.insertId
        res.status(201).send(user)
    }).catch(err => {
        res.status(200).send({
            flag: false
        })
    })
})



router.post("/updateUser", (req, res) => {
    var user = req.body
    user.acc_password = crypto.createHash('sha256').update(user.acc_password).digest('base64')

    DB.update(MyDB, "tbl_accounts", user).then(response => {

        res.status(200).send({
            flag: true
        })
    }).catch(err => {
        console.log(err)
        res.status(200).send({
            flag: false
        })
    })
})

router.post("/deleteUser", (req, res) => {

    let login = req.body.acc_login

    if (login == req.session.user) {
        res.status(200).send({
            flag: false,
            msg: "Cannot delete logged in User!"
        })
    } else if (req.session.user == undefined) {
        console.log("[!] Authentication falied!")
        res.status(200).send({
            flag: false,
            msg: "[!] Authentication falied!"
        })
    } else {
        console.log(req.session.user, login)
        let constraint = `= '${req.body.acc_login}'`

        DB.delete(MyDB, "tbl_accounts", "acc_login", constraint).then(response => {
            console.log("[+] Deleted user " + req.body.acc_login)
            res.status(200).send({
                flag: true
            })
        }).catch(err => {
            console.log(err)
            res.status(200).send({
                flag: false
            })
        })
    }
})

module.exports = router