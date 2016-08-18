'use strict';
const mongojs = require('mongojs');
const db = mongojs('blog', ['posts']);

module.exports = {
	insertPost(req) {
		return new Promise ((resolve, reject) => {
			req.body.comments = [];
			db.posts.insert(req.body, (err, doc) => {
				if (err || !doc) {
					err = err || 500;
					reject(err);
				}
				console.log(`Adding blog post...`);
				resolve(doc);
			});
		})
	},
	retrievePost(req) {
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
	modifyPost(req, modBody) {
		return new Promise ((resolve, reject) => {
			db.posts.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},
				update:{$set: modBody},
				new: true
			}, function(err, doc) {
				if (err || !doc) {
					err = err || 500;
					reject(err);
				}
				console.log(`Updating blog post with id ${req.params.id}...`);
				resolve(doc);
			});
		})
	},
	deletePost(req) {
		return new Promise ((resolve, reject) => {
			db.posts.remove({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
				if (err || !doc) {
					err = err || 500;
					reject(err);
				}
				console.log(`Removing blog post with id ${req.params.id}...`);
				resolve(doc);
			});
		})
	},
	checkUser(req) {
		return new Promise ((resolve, reject) => {
			db.posts.find({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
				debugger;
				if (err || !doc) {
					err = err || 500;
					reject(err);
				}
				if (!req.params.commentid && req.user.username !== doc[0].username ||
					req.params.commentid && req.user.username !== doc[0].comments[req.params.commentid].username) {
					reject('Invalid user');
				}
				resolve();
			});
		})
	}
}
