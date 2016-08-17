'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const actions = require('./controllers/actions');
const utils = require('./controllers/utils');

const app = express();
const PORT = 8080;

app.use(morgan('combined'));
app.use(bodyParser());

console.log(`Listening on port:${PORT}`);
app.listen(PORT);

app.post('/posts/', (req, res) => {
	utils.checkForProperty(req.body.message);
	actions.insertPost(req, res)
	.then(handleResponse(res))
	.catch(handleErrorResponse(res))
});

app.get('/posts/:id', (req, res) => {
	actions.etrievePost(req, res)
	.then(handleResponse(res))
	.catch(handleErrorResponse(res))
});

app.put('/posts/:id', (req, res) => {
	actions.modifyPost(req, res, req.body)
	.then(handleResponse(res))
	.catch(handleErrorResponse(res))
});

app.delete('/posts/:id', (req, res) => {
	actions.deletePost(req)
	.then(handleResponse(res))
	.catch(handleErrorResponse(res))
});

app.post('/posts/:id/comments', (req, res) => {
	utils.checkForProperty(req.body.message);
	actions.retrievePost(req)
	.then((doc) => {
		req.body.id = doc.comments.length;
		doc.comments.push(req.body);
		actions.modifyPost(req, res, doc)
		.then(handleResponse(res))
		.catch(handleErrorResponse(res))
	})
	.catch(handleErrorResponse(res))
});

app.put('/posts/:id/comments/:commentid', (req, res) => {
	actions.retrievePost(req, res)
	.then((doc) => {
		doc.comments[req.params.commentid].message = req.body.message
		actions.modifyPost(req, res, doc)
		.then(handleResponse(res))
		.catch(handleErrorResponse(res))
	})
	.catch(handleErrorResponse(res))
});

app.delete('/posts/:id/comments/:commentid', (req, res) => {
	actions.retrievePost(req, res)
	.then((doc) => {
		utils.reSizeIds(doc.comments, parseInt(req.params.commentid)+1);
		doc.comments.splice(req.params.commentid, 1);
		actions.modifyPost(req, res, doc)
		.then(handleResponse(res))
		.catch(handleErrorResponse(res))
	})
	.catch(handleErrorResponse(res))
});

function handleResponse (res) {
	return ((doc) => {
		res.json(doc)
	});
}

function handleErrorResponse (res) {
	return ((err) => {
		res.send(err);
	})
}