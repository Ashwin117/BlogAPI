'use strict';

const utils = require('../../actions/utils');
const expect = require('chai').expect;

describe('Utils', () => {
	describe('ReSizeId', () => {
		it('Finds comment id in array of comments', () => {
			const list = [{id:3}, {id:4}, {id:5}, {id:6}];
			const index = utils.getCommentIndex(4, list);
			expect(index).to.equal('1');
		});
		it('Returns undefined if cannot find comment id in array of comments', () => {
			const list = [{id:3}, {id:4}, {id:5}, {id:6}];
			const index = utils.getCommentIndex(34, list);
			expect(index).to.equal(void(0));
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