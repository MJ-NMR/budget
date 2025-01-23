#!/usr/bin/env node
const express = require('express');
const splite3 = require('sqlite3')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
const db = new  splite3.Database('./database.db');

app.use(morgan('tiny'));
app.use(bodyParser.json());

// create new envelopes
app.put('/user', (req, res, next) => {
	console.log(req.body);
	const user = req.body || null;
	if(user){
		db.run(`INSERT INTO users (name, pass) VALUES ("${user.name}", "${user.pass}")`, (err) => {
			if(!err){
				res.send(`The user ${user.name} created Successfully`);
			}else{
				res.send(err);
			}
		});
	}
	return;
});

const port = process.env.port || 8080;
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});