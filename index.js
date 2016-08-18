'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const stormpath = require('express-stormpath');
const actions = require('./controllers/actions');
const utils = require('./controllers/utils');

const app = express();
const PORT = 8080;

app.use(stormpath.init(app, {
  	expand: {
    	customData: true,
  	},
  	web: {
		produces: ['application/json']
	}
}));
app.use(morgan('combined'));
app.use(bodyParser());

console.log(`Listening on port:${PORT}`);
app.listen(PORT);

app.post('/posts/', stormpath.apiAuthenticationRequired, (req, res) => {
	utils.checkForProperty(req.body.message);
	req.body.username = req.user && req.user.username;
	actions.insertPost(req)
	.then(handleResponse(res))
	.catch(handleErrorResponse(res))
});

app.get('/posts/:id', (req, res) => {
	actions.retrievePost(req)
	.then(handleResponse(res))
	.catch(handleErrorResponse(res))
});

app.put('/posts/:id', stormpath.apiAuthenticationRequired, (req, res) => {
	utils.checkForProperty(req.body.message);
	req.body.username = req.user && req.user.username;
	actions.checkUser(req)
	.then(() => {
		actions.modifyPost(req, req.body)
		.then(handleResponse(res))
		.catch(handleErrorResponse(res))
	})
	.catch(handleErrorResponse(res))
});

app.delete('/posts/:id', stormpath.apiAuthenticationRequired, (req, res) => {
	actions.checkUser(req)
	.then(() => {
		actions.deletePost(req)
		.then(handleResponse(res))
		.catch(handleErrorResponse(res))
	})
	.catch(handleErrorResponse(res))
});

app.post('/posts/:id/comments', stormpath.apiAuthenticationRequired, (req, res) => {
	utils.checkForProperty(req.body.message);
	req.body.username = req.user && req.user.username;
	actions.retrievePost(req)
	.then((doc) => {
		req.body.id = doc.comments.length;
		doc.comments.push(req.body);
		actions.modifyPost(req, doc)
		.then(handleResponse(res))
		.catch(handleErrorResponse(res))
	})
	.catch(handleErrorResponse(res))
});

app.put('/posts/:id/comments/:commentid', stormpath.apiAuthenticationRequired, (req, res) => {
	utils.checkForProperty(req.body.message);
	actions.checkUser(req)
	.then(() => {
		actions.retrievePost(req)
		.then((doc) => {
			doc.comments[req.params.commentid].message = req.body.message
			actions.modifyPost(req, doc)
			.then(handleResponse(res))
			.catch(handleErrorResponse(res))
		})
		.catch(handleErrorResponse(res))
	})
	.catch(handleErrorResponse(res))
});

app.delete('/posts/:id/comments/:commentid', stormpath.apiAuthenticationRequired, (req, res) => {
	actions.checkUser(req)
	.then(() => {
		actions.retrievePost(req)
		.then((doc) => {
			utils.reSizeIds(doc.comments, parseInt(req.params.commentid)+1);
			doc.comments.splice(req.params.commentid, 1);
			actions.modifyPost(req, doc)
			.then(handleResponse(res))
			.catch(handleErrorResponse(res))
		})
		.catch(handleErrorResponse(res))
	})
	.catch(handleErrorResponse(res))
});

function handleResponse (res) {
	return ((doc) => {
		res.json(doc);
	});
}

function handleErrorResponse (res) {
	return ((err) => {
		res.send(err);
	})
}