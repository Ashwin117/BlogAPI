'use strict';
let mongojs = require('mongojs');
let db = mongojs('blog', ['posts']);

module.exports = {
	insertPost(req) {
		return new Promise ((resolve, reject) => {
			req.body.comments = [];
			db.posts.insert(req.body, (err, doc) => {
				if (err || !doc) {
					err = err || 500;
					reject(err);
					return;
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
					return;
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
					return;
				}
				console.log(`Updating blog post with id ${req.params.id}...`);
				resolve(doc);
			});
		})
	},
	deletePost(req) {
		debugger;
		return new Promise ((resolve, reject) => {
			debugger;
			db.posts.remove({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
				debugger;
				if (err || !doc) {
					err = err || 500;
					reject(err);
					return;
				}
				console.log(`Removing blog post with id ${req.params.id}...`);
				resolve(doc);
			});
		})
	},
	checkUser(req) {
		return new Promise ((resolve, reject) => {
			db.posts.find({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
				if (err || !doc) {
					err = err || 500;
					reject(err);
					return;
				}
				if (doc[0].comments && req.params.commentid && !doc[0].comments[req.params.commentid]) {
					reject('That comment does not exist');
					return;
				}
				if (!req.params.commentid && req.user.username !== doc[0].username ||
					req.params.commentid && req.user.username !== doc[0].comments[req.params.commentid].username) {
					reject('Invalid user');
					return;
				}
				resolve();
			});
		})
	}
}
