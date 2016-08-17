'use strict';
const mongojs = require('mongojs');
const db = mongojs('blog', ['posts']);

module.exports = {
	insertPost(req, res) {
		return new Promise ((resolve, reject) => {
			req.body.comments = [];
			db.posts.insert(req.body, (err, doc) => {
				if (err || !doc) {
					err = err || 500;
					reject(err);
				} else {
					console.log(`Adding blog post...`);
					resolve(doc);
				}
			});
		})
	},
	retrievePost(req, res) {
		return new Promise ((resolve, reject) => {
			db.posts.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
				if (err || !doc) {
					err = err || 500;
					reject(err);
				}
				console.log(`Getting blog post with id ${req.params.id}...`);
				resolve(doc);
			});
		})
	},
	modifyPost(req, res, modBody) {
		return new Promise ((resolve, reject) => {
			db.posts.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},
				update:{$set: modBody},
				new: true
			}, function(err, doc) {
				if (err || !doc) {
					err = err || 500;
					reject(err);
				} else {
					console.log(`Updating blog post with id ${req.params.id}...`);
					resolve(doc);
				}
			});
		})
	},
	deletePost(req, res) {
		return new Promise ((resolve, reject) => {
			db.posts.remove({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
				if (err || !doc) {
					err = err || 500;
					reject(err);
				} else {
					console.log(`Removing blog post with id ${req.params.id}...`);
					resolve(doc);
				}
			});
		})
	}
}
