'use strict'

module.exports = {
	handleSuccess(res) {
		return ((doc) => {
			res.json(doc);
		});
	},
	handleError(res) {
		return ((err) => {
			res.send(err);
		});
	}
}