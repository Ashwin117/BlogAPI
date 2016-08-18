'use strict'

const dbActions = require('../models/db-actions');
const utils = require('../models/utils');
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
			actions.modifyPost(req, req.body)
			.then(responseHandler.handleSuccess(res))
			.catch(responseHandler.handleError(res))
		})
		.catch(responseHandler.handleError(res))
	},
	deleteBlogPost (req, res) {
		debugger;
		dbActions.checkUser(req)
		.then(() => {
			dbActions.deletePost(req)
			.then(responseHandler.handleSuccess(res))
			.catch(responseHandler.handleError(res))
		})
		.catch(responseHandler.handleError(res))
	}
}