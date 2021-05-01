/*
TO DO:
-----
READ ALL COMMENTS AND REPLACE VALUES ACCORDINGLY
*/

var mysql = require("mysql");
var fs = require("fs")

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



var con = mysql.createConnection({
  host: HOST,
  user: USER, // replace with the database user provided to you
  password: PASSWORD_TXT, // replace with the database password provided to you
  database: DATABASE, // replace with the database user provided to you
  port: PORT
});

con.connect(function (err) {
  if (err) {
    throw err;
  };
  console.log("Connected!");
  var sql = `CREATE TABLE tbl_accounts(acc_id INT NOT NULL AUTO_INCREMENT,
                                       acc_name VARCHAR(20) NOT NULL,
                                       acc_login VARCHAR(20) NOT NULL UNIQUE,
                                       acc_password VARCHAR(50)NOT NULL, PRIMARY KEY (acc_id))`;
  con.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    console.log("Table created");
  });
});