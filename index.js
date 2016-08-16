'use strict';

const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

const app = express();
const db = mongojs('blog', ['posts']);
const PORT = 8080;

app.use(bodyParser());

console.log(`Listening on port:${PORT}`);
app.listen(PORT);

app.get('/posts/:id', (req, res) => {
	retrievePost(req)
	.then((doc) => {
		res.json(doc);
	})
	.catch((err) => {
		res.send(err);
	})
});

app.put('/posts/:id', (req, res) => {
	modifyPost(req, req.body)
	.then((doc) => {
		res.json(doc);
	})
	.catch((err) => {
		res.send(err);
	})
});

app.post('/posts/', (req, res) => {
	db.posts.insert(req.body, (err, doc) => {
		if (err) {
			res.send(err);
		} else {
			console.log('Adding blog post...');
			res.json(doc);
		}
	});
});

app.delete('/posts/:id', (req, res) => {
	db.posts.remove({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
		if (err) {
			res.send(err);
		} else {
			console.log('Removing blog post...');
			res.json(doc);
		}
	});
});

app.post('/posts/:id/comments', (req, res) => {
	retrievePost(req)
	.then((doc) => {
		if (!doc.comments) {
			doc.comments = [];
		}
		doc.comments.push(req.body);
		modifyPost(req, doc)
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => {
			res.send(err);
		})
	})
	.catch((err) => {
		res.send(err);
	})
});

function retrievePost (req) {
	return new Promise ((resolve, reject) => {
		db.posts.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
			if (err) {
				reject(err);
			}
			console.log('Getting blog post...');
			resolve(doc);
		});
	});
}

function modifyPost (req, modBody) {
	return new Promise ((resolve, reject) => {
		db.posts.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},
			update:{$set: modBody},
			new: true
		}, function(err, doc) {
			if (err) {
				reject(err);
			} else {
				console.log('Updating blog post...');
				resolve(doc);
			}
		});
	});
}

function insertPost (req) {
	return new Promise ((resolve, reject) => {
		db.posts.insert(req.body, (err, doc) => {
			if (err) {
				reject(err);
			} else {
				console.log('Adding blog post...');
				resolve(doc);
			}
		});
	});
}
