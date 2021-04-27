const express = require('express');
const app = express();
const port = 8888;

const config = {
  host: 'dbnode',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.query('CREATE TABLE IF NOT EXISTS people(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  name VARCHAR (255) NOT NULL)');

const sql = `INSERT INTO people(name) values('Tiago')`;
connection.query(sql);
connection.end();

app.get('/',(req,res) => {
  const connection = mysql.createConnection(config);
  connection.query("select *from people", function (err, result, fields) {
    if (err) throw err;
    res.send(`<h1>Full Cycle</h1> <br /> Nome: ${result[0].name}`);
  });
  connection.end();

});

app.listen(port);