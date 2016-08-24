'use strict';

module.exports = {
	getCommentIndex(commentId, comments) {
		for (let key in comments) {
			if (comments[key].id === commentId) {
				return key;
			}
		}
	},
	checkForProperty(prop) {
		if (!prop) {
			throw new Error ('Missing property');
		}
	}
}