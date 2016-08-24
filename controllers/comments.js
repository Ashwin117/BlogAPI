'use strict'

const dbActions = require('../actions/db-actions');
const utils = require('../actions/utils');
const responseHandler = require('./response-handler');

module.exports = {
	createComment (req, res) {
		utils.checkForProperty(req.body.message);
		req.body.username = req.user && req.user.username;
		dbActions.retrievePost(req)
		.then((doc) => {
			req.body.id = new Date().valueOf().toString();
			doc.comments.push(req.body);
			dbActions.modifyPost(req, doc)
			.then(responseHandler.handleSuccess(res))
			.catch(responseHandler.handleError(res))
		})
		.catch(responseHandler.handleError(res))
	},
	modifyComment (req, res) {
		utils.checkForProperty(req.body.message);
		dbActions.checkUser(req)
		.then(() => {
			dbActions.retrievePost(req)
			.then((doc) => {
				let commentIndex = utils.getCommentIndex(req.params.commentid, doc.comments);
				doc.comments[commentIndex].message = req.body.message
				dbActions.modifyPost(req, doc)
				.then(responseHandler.handleSuccess(res))
				.catch(responseHandler.handleError(res))
			})
			.catch(responseHandler.handleError(res))
		})
		.catch(responseHandler.handleError(res))
	},
	deleteComment (req, res) {
		dbActions.checkUser(req)
		.then(() => {
			dbActions.retrievePost(req)
			.then((doc) => {
				let commentIndex = utils.getCommentIndex(req.params.commentid, doc.comments);
				doc.comments.splice(commentIndex, 1);
				dbActions.modifyPost(req, doc)
				.then(responseHandler.handleSuccess(res))
				.catch(responseHandler.handleError(res))
			})
			.catch(responseHandler.handleError(res))
		})
		.catch(responseHandler.handleError(res))
	}
}
