#!/usr/bin/env node
const express = require('express');
const app = express();

app.use((req, res, next) => {
	res.send('<h1>From the server</h1>');
});

const port = process.env.port || 8080;
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});