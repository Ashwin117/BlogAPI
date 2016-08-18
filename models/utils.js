'use strict';

module.exports = {
	reSizeIds(list, index) {
		for (var i=index; i< list.length; i++) {
			list[i].id = list[i].id - 1;
		}
	},
	checkForProperty(prop) {
		if (!prop) {
			throw new Error ('Missing property');
		}
	}
}