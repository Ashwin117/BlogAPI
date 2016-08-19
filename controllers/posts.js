'use strict'

const dbActions = require('../actions/db-actions');
const utils = require('../actions/utils');
const responseHandler = require('./responseHandler');

module.exports = {
	createBlogPost (req, res) {
		utils.checkForProperty(req.body.message);
		req.body.username = req.user && req.user.username;
		dbActions.insertPost(req)
		.then(responseHandler.handleSuccess(res))
		.catch(responseHandler.handleError(res))
	},
	retrieveBlogPosts (req, res) {
		dbActions.retrievePost(req)
		.then(responseHandler.handleSuccess(res))
		.catch(responseHandler.handleError(res))
	},
	modifyBlogPost (req, res) {
		utils.checkForProperty(req.body.message);
		req.body.username = req.user && req.user.username;
		dbActions.checkUser(req)
		.then(() => {
			dbActions.modifyPost(req, req.body)
			.then(responseHandler.handleSuccess(res))
			.catch(responseHandler.handleError(res))
		})
		.catch(responseHandler.handleError(res))
	},
	deleteBlogPost (req, res) {
		dbActions.checkUser(req)
		.then(() => {
			dbActions.deletePost(req)
			.then(responseHandler.handleSuccess(res))
			.catch(responseHandler.handleError(res))
		})
		.catch(responseHandler.handleError(res))
	}
}