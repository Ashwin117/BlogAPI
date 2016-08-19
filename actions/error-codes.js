'use strict'

const badRequest = {
	status: 400,
	message: 'Not able to perform due to invalid request parameters'
}

const unauthorized = {
	status: 401,
	message: 'Invalid user'
}

const notFound = {
	status: 404,
	message: 'That comment does not exist'
}

module.exports = {
	badRequest,
	unauthorized,
	notFound
}