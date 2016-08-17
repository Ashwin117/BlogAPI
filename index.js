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

app.post('/posts/', (req, res) => {
	insertPost(req, res)
	.then((doc) => {
		res.json(doc);
	})
});

app.get('/posts/:id', (req, res) => {
	retrievePost(req, res)
	.then((doc) => {
		res.json(doc);
	})
});

app.put('/posts/:id', (req, res) => {
	modifyPost(req, res, req.body)
	.then((doc) => {
		res.json(doc);
	})
});

app.delete('/posts/:id', (req, res) => {
	deletePost(req)
	.then((doc) => {
		res.json(doc);
	})
});

app.post('/posts/:id/comments', (req, res) => {
	retrievePost(req)
	.then((doc) => {
		req.body.id = doc.comments.length;
		doc.comments.push(req.body);
		modifyPost(req, res, doc)
		.then((doc) => {
			res.json(doc);
		})
	})
});

app.put('/posts/:id/comments/:commentid', (req, res) => {
	retrievePost(req, res)
	.then((doc) => {
		doc.comments[req.params.commentid].message = req.body.message
		modifyPost(req, res, doc)
		.then((doc) => {
			res.json(doc)
		})
	})
});

app.delete('/posts/:id/comments/:commentid', (req, res) => {
	retrievePost(req, res)
	.then((doc) => {
		reSizeId(doc.comments, parseInt(req.params.commentid)+1);
		doc.comments.splice(req.params.commentid, 1);
		modifyPost(req, res, doc)
		.then((doc) => {
			res.json(doc)
		})
	})
});

function insertPost (req, res) {
	return new Promise ((resolve, reject) => {
		req.body.comments = [];
		db.posts.insert(req.body, (err, doc) => {
			if (err) {
				reject(err);
			} else {
				console.log(`Adding blog post with id ${req.params.id}...`);
				resolve(doc);
			}
		});
	})
	.catch((err) => {
		res.send(err);
	});
}

function retrievePost (req, res) {
	return new Promise ((resolve, reject) => {
		db.posts.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
			if (err) {
				reject(err);
			}
			console.log(`Getting blog post with id ${req.params.id}...`);
			resolve(doc);
		});
	})
	.catch((err) => {
		res.send(err);
	})
}

function modifyPost (req, res, modBody) {
	return new Promise ((resolve, reject) => {
		db.posts.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},
			update:{$set: modBody},
			new: true
		}, function(err, doc) {
			if (err) {
				reject(err);
			} else {
				console.log(`Updating blog post with id ${req.params.id}...`);
				resolve(doc);
			}
		});
	})
	.catch((err) => {
		res.send(err);
	})
}

function deletePost (req, res) {
	return new Promise ((resolve, reject) => {
		db.posts.remove({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
			if (err) {
				reject(err);
			} else {
				console.log(`Removing blog post with id ${req.params.id}...`);
				resolve(doc);
			}
		});
	})
	.catch((err) => {
		res.send(err);
	})
}

function reSizeId (list, index) {
	for (var i=index; i< list.length; i++) {
		list[i].id = list[i].id - 1;
	}
}