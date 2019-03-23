var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'dev',
  password: 'abc123',
  database: 'rest101'
});
console.log("connection made");

connection.connect();
/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('select * from members', function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

router.post('/', (req, res) => {
  //console.log(JSON.stringify(req));
  var data = {first_name: req.body.first_name, last_name: req.body.last_name,
              phone: req.body.phone, email: req.body.email, address: req.body.address
              };
  var sql = "INSERT INTO members SET ?";

  var query = connection.query(sql, data, (err, results) => {
    if(err) {
      res.send("error: " + JSON.stringify(err));
      return;
    };
    res.send("successfully saved");
  })
          
})

router.delete('/', (req, res)=> {
  var sql = "DELETE FROM members WHERE last_name='"+req.body.last_name+"'";
  console.log(sql);
  var query = connection.query(sql, (err, results) => {
    if(err) {
      res.send("error: " + JSON.stringify(err));
      return;
    };
    res.send("successfully removed");
  })
})

router.put('/', (req, res)=> {
  var sql = "UPDATE members SET first_name='"+req.body.first_name+"' WHERE last_name='"+req.body.last_name+"'";
  var query = connection.query(sql, (err, results) => {
    if (err) {
      res.send("error: " + JSON.stringify(err));
      return;
    };
    res.send("successfully updated");
  })
})

module.exports = router;
