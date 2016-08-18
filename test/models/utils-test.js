'use strict';

const utils = require('../../models/utils');
const expect = require('chai').expect;

describe('Utils', () => {
	describe('ReSizeId', () => {
		it('Resizes the ids in a list', () => {
			const list = [{id:3}, {id:4}, {id:5}, {id:6}];
			utils.reSizeIds(list, 1);
			console.log(list);
			expect(list).to.deep.equal([{id:3}, {id:3}, {id:4}, {id:5}]);
		});
	});
	describe('CheckForProperty', () => {
		it('Checks for a missing property', () => {
			const list = {
				id: 4
			};
			utils.checkForProperty(list.id);
			expect(!!list.id).to.be.true;
		});
		it('Checks for a missing property and throws error', () => {
			const list = {};
			expect(() => {
				utils.checkForProperty(list.id)
			}).to.throw(Error);
		});
	});
});