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
app.put('/u', (req, res, next) => {
	const user = req.body;
	console.log(user);
	if(user.name && user.pass){
		db.run(`INSERT INTO users (name, pass) VALUES ("${user.name}", "${user.pass}")`, (err) => {
			if(!err){
				res.send(`The user ${user.name} created Successfully`);
			}else{
				res.send(err);
			}
		});
	}else{
		res.send('There are no username or password');
	}	
});

// update envelops
app.post('/', (req, res, next) => {
	const user = req.body;
	console.log(user);
	if(user.name && user.pass){
		db.get(`SELECT id FROM users WHERE name="${user.name}" AND pass="${user.pass}"`, (err, row) => {
			if(err){
				res.send(err);
			}else{
				const id = row.id;
				console.log(row);
				if(id){
					db.run(`UPDATE envelopes SET bills=${user.bills}, school=${user.school}, gas=${user.gas}, food=${user.food}, cloth=${user.cloth}, left=${user.left} WHERE id=${id};`, (err) => {
						if(err){
							res.send(err);
						}else{
							res.send('Updated Successfully')
						}
					});
				}else{
					res.send('There are no username or password');
				}
			}
		});
	}
});

// retrieve envelops
app.get('/', (req, res, next) => {
	user = req.query;
	console.log(user);
	if(user.name && user.pass){
		db.get(`select id from users where name="${user.name}" and pass="${user.pass}"`, (err, row) => {
			if(err){
				res.send(err);
			}else{
				console.log(row);
				db.get(`select food, bills, cloth, school, gas, left from envelopes where id=${row.id}`, (err, row) => {
					if(err){
						res.send(err);
					}else{
						res.send(row);
					}
				});
			}

		});
	}
});

const port = process.env.port || 8080;
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});